import { Args, CONTEXT, ID, Mutation, Resolver, Query } from '@nestjs/graphql';
import { CouponService } from './coupon.service';
import { CampaignDTO } from './dto/campaign.dto';
import { CreateCampaignInput } from './dto/create-campaign.input';
import type { UserContext } from '../auth/authenticated-admin';
import { Inject, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Resolver()
@UseGuards(JwtAuthGuard)
export class CouponResolver {
  constructor(
    private couponService: CouponService,
    @Inject(CONTEXT)
    private context: UserContext,
  ) {}

  @Mutation(() => CampaignDTO)
  async createCampaign(
    @Args('input') input: CreateCampaignInput,
  ): Promise<CampaignDTO> {
    return this.couponService.createCampaign(input);
  }

  @Query(() => String)
  async exportCampaignCodes(
    @Args('batchId', { type: () => ID }) batchId: number,
  ): Promise<string> {
    return (
      await this.couponService.exportCampaignCodes({
        batchId,
        operatorId: this.context.req.user.id,
      })
    ).url;
  }
}
