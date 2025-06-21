import {
  NestjsQueryGraphQLModule,
  PagingStrategies,
} from '@ptc-org/nestjs-query-graphql';
import { NestjsQueryTypeOrmModule } from '@ptc-org/nestjs-query-typeorm';
import { Module } from '@nestjs/common';
import { CouponEntity } from '@ridy/database';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CouponDTO } from './dto/coupon.dto';
import { CouponInput } from './dto/coupon.input';
import { CampaignEntity } from '@ridy/database';
import { CampaignDTO } from './dto/campaign.dto';
import { CampaignCodeEntity } from '@ridy/database';
import { CampaignCodeDTO } from './dto/campaign-code.dto';
import { CouponService } from './coupon.service';
import { CouponResolver } from './coupon.resolver';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [
        NestjsQueryTypeOrmModule.forFeature([
          CouponEntity,
          CampaignEntity,
          CampaignCodeEntity,
        ]),
      ],
      resolvers: [
        {
          EntityClass: CouponEntity,
          DTOClass: CouponDTO,
          CreateDTOClass: CouponInput,
          UpdateDTOClass: CouponInput,
          create: { many: { disabled: true } },
          update: { many: { disabled: true } },
          delete: { many: { disabled: true } },
          pagingStrategy: PagingStrategies.OFFSET,
          enableTotalCount: true,
          guards: [JwtAuthGuard],
        },
        {
          EntityClass: CampaignEntity,
          DTOClass: CampaignDTO,
          create: { disabled: true },
          update: { disabled: true },
          delete: { many: { disabled: true } },
          pagingStrategy: PagingStrategies.OFFSET,
          enableTotalCount: true,
          guards: [JwtAuthGuard],
        },
        {
          EntityClass: CampaignCodeEntity,
          DTOClass: CampaignCodeDTO,
          guards: [JwtAuthGuard],
          pagingStrategy: PagingStrategies.OFFSET,
          enableTotalCount: true,
          create: { disabled: true },
          update: { disabled: true },
          delete: { disabled: true },
        },
      ],
    }),
  ],
  providers: [CouponService, CouponResolver],
})
export class CouponModule {}
