import { Args, CONTEXT, ID, Mutation, Resolver } from '@nestjs/graphql';
import { GiftCardService } from './gift-card.service';
import { GiftBatchDTO } from './dto/gift-batch.dto';
import { CreateGiftBatchInput } from './dto/create-gift-batch.input';
import { Inject, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import type { UserContext } from '../auth/authenticated-admin';

@Resolver()
@UseGuards(JwtAuthGuard)
export class GiftCardResolver {
  constructor(
    private readonly giftCardService: GiftCardService,
    @Inject(CONTEXT) private readonly context: UserContext,
  ) {}

  @Mutation(() => GiftBatchDTO)
  async createGiftCardBatch(
    @Args('input', { type: () => CreateGiftBatchInput })
    input: CreateGiftBatchInput,
  ) {
    return this.giftCardService.createGiftCardBatch({
      ...input,
      operatorId: this.context.req.user.id,
    });
  }

  @Mutation(() => String)
  async exportGiftCardBatch(
    @Args('batchId', { type: () => ID }) batchId: number,
  ): Promise<string> {
    return (
      await this.giftCardService.exportGiftCardBatch({
        batchId,
        operatorId: this.context.req.user.id,
      })
    ).url;
  }
}
