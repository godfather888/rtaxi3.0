import { InjectPubSub } from '@ptc-org/nestjs-query-graphql';
import { Injectable } from '@nestjs/common';
import { Subscription } from '@nestjs/graphql';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { WSContext } from '../auth/authenticated-admin';
import { TaxiSupportRequestDTO } from './dto/taxi-support-request.dto';

@Injectable()
export class ComplaintSubscriptionService {
  constructor(
    @InjectPubSub()
    public pubSub: RedisPubSub,
  ) {}

  @Subscription(() => TaxiSupportRequestDTO, {
    filter: (
      payload: { complaintCreated: TaxiSupportRequestDTO; adminIds: number[] },
      variables,
      context: WSContext,
    ) => {
      return payload.adminIds.includes(context.req.user.id);
    },
  })
  complaintCreated() {
    return this.pubSub.asyncIterator('complaintCreated');
  }
}
