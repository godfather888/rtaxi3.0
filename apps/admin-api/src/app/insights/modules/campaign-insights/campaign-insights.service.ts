import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CampaignCodeEntity } from '@ridy/database';
import { IsNull, Not, Repository } from 'typeorm';
import { UsedUnusedCountPairDTO } from '../../core/dto/used-unused-count-pair.dto';

@Injectable()
export class CampaignInsightsService {
  constructor(
    @InjectRepository(CampaignCodeEntity)
    private campaignCodeRepository: Repository<CampaignCodeEntity>,
  ) {}

  async getUsedUnusedCountPair(input: {
    campaignId: number;
  }): Promise<UsedUnusedCountPairDTO> {
    const used = await this.campaignCodeRepository.count({
      where: {
        campaignId: input.campaignId,
        customerId: Not(IsNull()),
      },
    });
    const unused = await this.campaignCodeRepository.count({
      where: {
        campaignId: input.campaignId,
        customerId: IsNull(),
      },
    });
    return { used, unused };
  }
}
