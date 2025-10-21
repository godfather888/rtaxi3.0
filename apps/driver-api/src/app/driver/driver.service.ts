import { Injectable } from "@nestjs/common";
import { DriverEntity } from "@ridy/database";
import { FindOptionsWhere, In, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { DriverStatus } from "@ridy/database";
import { DriverRedisService } from "@ridy/database";
import { QrCodeOutput } from "./dto/qr-code.output.dto";
import { randomUUID } from "crypto";
import { DataSource } from "typeorm";

@Injectable()
export class DriverService {
  private static readonly QR_CODE_TTL_SECONDS = 120;
  constructor(
    @InjectRepository(DriverEntity) private repo: Repository<DriverEntity>,
    private driverRedisService: DriverRedisService,

  ) {}

  async findWithDeleted(
    input: FindOptionsWhere<DriverEntity>
  ): Promise<DriverEntity | null> {
    return this.repo.findOne({ where: input, withDeleted: true });
  }

  async findOrCreateUserWithMobileNumber(input: {
    mobileNumber: string;
    countryIso?: string;
  }): Promise<DriverEntity> {
    const findResult = await this.findWithDeleted({
      mobileNumber: input.mobileNumber,
    });
    if (findResult?.deletedAt != null) {
      await this.repo.restore(findResult.id);
    }
    if (findResult == null) {
      const driver = this.repo.create(input);
      return this.repo.save(driver);
    }
    const user = await this.repo.findOne({
      where: { mobileNumber: input.mobileNumber },
      withDeleted: true,
      relations: {
        documents: true,
        media: true,
      },
    });
    if (!user) {
      throw new Error(`Driver with mobile number ${input.mobileNumber} not found`);
    }
    return user;
  }

  async findByIds(ids: number[]): Promise<DriverEntity[]> {
    return this.repo.find({ where: { id: In(ids) }, withDeleted: true });
  }

  async setPassword(input: {
    driverId: number;
    password: string;
  }): Promise<DriverEntity> {
    await this.repo.update(input.driverId, {
      password: input.password,
    });
    const driver = await this.repo.findOneBy({ id: input.driverId });
    if (!driver) {
      throw new Error(`Driver with id ${input.driverId} not found`);
    }
    return driver;
  }

  async expireDriverStatus(driverIds: number[]) {
    if (driverIds.length < 1) {
      return;
    }
    this.driverRedisService.expire(driverIds);
    return this.repo.update(driverIds, {
      status: DriverStatus.Offline,
      lastSeenTimestamp: new Date(),
    });
  }

  restore(id: number) {
    return this.repo.restore(id);
  }

  async generateQrCode(driverId: number): Promise<QrCodeOutput> {
    const token = randomUUID();
    const expiresAt = new Date(
      Date.now() + DriverService.QR_CODE_TTL_SECONDS * 1000
    );

    console.log("token :", token, "expiresAt :", expiresAt);

    await this.driverRedisService.setQrCodeToken(
      driverId,
      token,
      DriverService.QR_CODE_TTL_SECONDS
    );

    return {
      qrCodeData: token,
      expiresAt,
    };
  }

  async setStatus(driverId: number, status: DriverStatus): Promise<DriverEntity> {
    await this.repo.update(driverId, { status });
    const driver = await this.repo.findOneBy({ id: driverId });
    if (!driver) {
      throw new Error(`Driver with id ${driverId} not found`);
    }
    return driver;
  }

  async setStatusAndLocation(driverId: number, status: DriverStatus, lat: number, lng: number): Promise<DriverEntity> {
    // Обновляем статус в БД
    await this.repo.update(driverId, { status });

    // Обновляем локацию в Redis (как в updateDriversLocationNew)
    await this.driverRedisService.setLocation(driverId, { lat, lng });

    const driver = await this.repo.findOneBy({ id: driverId });
    if (!driver) {
      throw new Error(`Driver with id ${driverId} not found`);
    }
    return driver;
  }

}
