import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import {
  CurrentConfiguration,
  LicenseInformationDTO,
  LicenseType,
  UpdateConfigResult,
  UpdateConfigStatus,
  UpdatePurchaseCodeResult,
  UpdatePurchaseCodeStatus,
} from '@ridy/database';
import * as fs from 'fs';
import { ForbiddenError } from '@nestjs/apollo';
import { UpdateConfigInputV2 } from './dto/update-config.input';
import { getConfig, LicenseVerifyService } from 'license-verify';

@Injectable()
export class ConfigurationService {
  constructor(
    private licenseVerifyService: LicenseVerifyService,
    private httpService: HttpService,
  ) {}

  async getLicenseInformation(): Promise<LicenseInformationDTO> {
    Logger.log('License information', 'ConfigurationService');
    Logger.log(
      this.licenseVerifyService.licenseInformation,
      'ConfigurationService',
    );
    if (this.licenseVerifyService.licenseInformation == null) {
      return null;
    }
    return {
      license: {
        buyerName:
          this.licenseVerifyService.licenseInformation?.data.buyerName ?? '-',
        licenseType:
          this.licenseVerifyService.licenseInformation?.data.licenseType ??
          LicenseType.Regular,
        supportExpireDate:
          this.licenseVerifyService.licenseInformation?.data.supportExpiry ==
          null
            ? null
            : new Date(
                this.licenseVerifyService.licenseInformation?.data.supportExpiry,
              ),
        connectedApps:
          this.licenseVerifyService.licenseInformation?.data.connectedApps ??
          [],
        platformAddons:
          this.licenseVerifyService.licenseInformation?.data.platformAddOns ??
          [],
      },
      benefits:
        this.licenseVerifyService.licenseInformation?.data.benefits ?? [],
      drawbacks:
        this.licenseVerifyService.licenseInformation?.data.drawbacks ?? [],
      availableUpgrades:
        this.licenseVerifyService.licenseInformation?.data.availableUpgrades ??
        [],
    };
  }

  async getConfiguration(): Promise<CurrentConfiguration | null> {
    const config = await getConfig(process.env.NODE_ENV ?? 'production');
    return config ?? new CurrentConfiguration();
  }

  async saveConfiguration(
    newConfig: Partial<CurrentConfiguration>,
  ): Promise<boolean> {
    const config = await this.getConfiguration();
    Logger.log(
      JSON.stringify(config),
      'ConfigurationService.saveConfiguration.config',
    );
    if (process.env.DEMO_MODE?.toLowerCase() == 'true') {
      throw new ForbiddenError('Cannot change configuration in demo mode.');
    }
    const finalConfig = Object.assign(config, newConfig);
    const str = JSON.stringify(finalConfig);
    await fs.promises.mkdir(`${process.cwd()}/config`, { recursive: true });
    await fs.promises.writeFile(
      `${process.cwd()}/config/config.${
        process.env.NODE_ENV ?? 'production'
      }.json`,
      str,
    );
    return true;
  }

  async updateConfig(
    input: UpdateConfigInputV2,
  ): Promise<CurrentConfiguration> {
    if (process.env.DEMO_MODE?.toLowerCase() == 'true') {
      throw new ForbiddenError('Cannot change configuration in demo mode.');
    }
    await this.saveConfiguration(input);
    const str = JSON.stringify({
      input,
    });
    await fs.promises.writeFile(
      `${process.cwd()}/config/credentials.json`,
      str,
    );

    setTimeout(async () => {
      Logger.log('Restarting services', 'Configuration');
      await firstValueFrom(
        this.httpService.get('http://taxi-rider-api:3000/restart'),
      );
      await firstValueFrom(
        this.httpService.get('http://taxi-driver-api:3000/restart'),
      );
      process.exit(0);
    }, 1000);
    return this.getConfiguration();
  }

  maskString(str?: string): string {
    if (str == null) {
      return null;
    }
    return str
      .split('')
      .map(() => '*')
      .join('');
  }

  async updatePurchaseCode(
    code: string,
    email?: string,
  ): Promise<UpdatePurchaseCodeResult> {
    const license = await this.licenseVerifyService.verifyLicense({
      purchaseCode: code,
      email: email,
    });
    Logger.log(license, 'ConfigurationService.updatePurchaseCode.license');
    if (license.status == 'OK') {
      await this.saveConfiguration({ purchaseCode: code });
      return {
        status: UpdatePurchaseCodeStatus.OK,
        data: {
          license: {
            buyerName: license.data?.buyerName ?? 'Unknown',
            licenseType: license.data?.licenseType ?? LicenseType.Regular,
            supportExpireDate: license.data != null ? new Date() : null,
            connectedApps: license.data?.connectedApps ?? [],
            platformAddons: license.data.platformAddOns ?? [],
          },
          benefits: license.data?.benefits ?? [],
          drawbacks: license.data?.drawbacks ?? [],
          availableUpgrades: license.data?.availableUpgrades ?? [],
        },
      };
    } else if (license.status == 'USED') {
      return {
        status: UpdatePurchaseCodeStatus.CLIENT_FOUND,
        clients: license.clients.map((client) => ({
          ...client,
          lastVerifiedAt:
            client.lastVerifiedAt == null
              ? null
              : new Date(client.lastVerifiedAt),
          firstVerifiedAt: new Date(client.firstVerifiedAt),
        })),
      };
    } else {
      return {
        status: UpdatePurchaseCodeStatus.INVALID,
      };
    }
  }

  async updateMapsAPIKey(
    backend: string,
    adminPanel: string,
  ): Promise<UpdateConfigResult> {
    await this.saveConfiguration({
      backendMapsAPIKey: backend,
      adminPanelAPIKey: adminPanel,
    });
    return {
      status: UpdateConfigStatus.OK,
    };
  }

  async updateFirebase(keyFileName: string): Promise<UpdateConfigResult> {
    await this.saveConfiguration({ firebaseProjectPrivateKey: keyFileName });
    setTimeout(async () => {
      Logger.log('Restarting services', 'Configuration');
      await firstValueFrom(
        this.httpService.get('http://taxi-rider-api:3000/restart'),
      );
      await firstValueFrom(
        this.httpService.get('http://taxi-driver-api:3000/restart'),
      );
      process.exit(0);
    }, 1000);
    return {
      status: UpdateConfigStatus.OK,
    };
  }

  async disablePreviousServer(input: {
    ip: string;
    purchaseCode: string;
  }): Promise<UpdateConfigResult> {
    const result = await this.licenseVerifyService.deactivteClient({
      purchaseCode: input.purchaseCode,
      ip: input.ip,
    });
    if (result == 'OK') {
      return { status: UpdateConfigStatus.OK };
    } else {
      return { status: UpdateConfigStatus.INVALID };
    }
  }
}
