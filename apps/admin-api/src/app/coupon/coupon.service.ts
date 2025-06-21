import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CampaignCodeEntity } from '@ridy/database';
import { CampaignEntity } from '@ridy/database';
import { Repository } from 'typeorm';
import { CreateCampaignInput } from './dto/create-campaign.input';
import { join } from 'path';
import { writeFile } from 'fs/promises';
import { json2csv } from 'json-2-csv';

@Injectable()
export class CouponService {
  constructor(
    @InjectRepository(CampaignEntity)
    private campaignRepository: Repository<CampaignEntity>,
    @InjectRepository(CampaignCodeEntity)
    private campaignCodeRepository: Repository<CampaignCodeEntity>,
  ) {}

  async createCampaign(input: CreateCampaignInput): Promise<CampaignEntity> {
    const campaign = this.campaignRepository.create();
    campaign.name = input.name;
    campaign.description = input.description;
    campaign.manyUsersCanUse = input.manyUsersCanUse;
    campaign.manyTimesUserCanUse = input.manyTimesUserCanUse;
    campaign.minimumCost = input.minimumCost;
    campaign.maximumCost = input.maximumCost;
    campaign.startAt = input.startAt;
    campaign.expireAt = input.expireAt;
    campaign.discountPercent = input.discountPercent;
    campaign.discountFlat = input.discountFlat;
    campaign.isFirstTravelOnly = input.isFirstTravelOnly;
    campaign.isEnabled = true;
    await this.campaignRepository.save(campaign);
    Array.from({ length: input.codesCount }).map(async () => {
      const code = Math.random().toString(36).substring(2, 15);
      return await this.campaignCodeRepository.save({
        code,
        campaignId: campaign.id,
      });
    });
    return campaign;
  }

  async exportCampaignCodes(input: {
    batchId: number;
    operatorId: number;
  }): Promise<{ url: string }> {
    const { batchId } = input;
    const result = await this.campaignCodeRepository.find({
      where: {
        campaignId: batchId,
        customerId: null,
      },
      select: {
        code: true,
      },
    });
    const str = await json2csv(result);
    const fileName = `${new Date().getTime().toString()}.csv`;
    await writeFile(
      join(process.cwd(), 'uploads', `${new Date().getTime().toString()}.csv`),
      str,
    );
    return {
      url: `uploads/${fileName}`,
    };
  }
}
