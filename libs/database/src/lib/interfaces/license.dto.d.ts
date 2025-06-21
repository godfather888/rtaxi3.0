import { LicenseType } from './config.dto';
import { AppType } from '../entities/enums/app-type.enum';
import { PlatformAddOn } from 'license-verify';
export declare class License {
  buyerName: string;
  licenseType: LicenseType;
  supportExpireDate?: Date;
  connectedApps: AppType[];
  platformAddons: PlatformAddOn[];
}
//# sourceMappingURL=license.dto.d.ts.map
