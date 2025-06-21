import { Args, CONTEXT, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { OrderService } from './order.service';
import { TaxiOrderNoteDTO } from './dto/taxi-order-note.dto';
import { CreateTaxiOrderNoteInput } from './dto/create-taxi-order-note.input';
import { Inject, UseGuards } from '@nestjs/common';
import type { UserContext } from '../auth/authenticated-admin';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Resolver()
@UseGuards(JwtAuthGuard)
export class OrderResolver {
  constructor(
    private orderService: OrderService,
    @Inject(CONTEXT)
    private context: UserContext,
  ) {}

  @Mutation(() => TaxiOrderNoteDTO)
  async createTaxiOrderNote(
    @Args('input', { type: () => CreateTaxiOrderNoteInput })
    input: CreateTaxiOrderNoteInput,
  ): Promise<TaxiOrderNoteDTO> {
    return await this.orderService.createTaxiOrderNote({
      ...input,
      staffId: this.context.req.user.id,
    });
  }

  @Query(() => Int, { nullable: true })
  async taxiOrderSuccessRate(
    @Args('startTime', { type: () => Date, nullable: true }) startTime?: Date,
    @Args('endTime', { type: () => Date, nullable: true }) endTime?: Date,
  ): Promise<number | null> {
    return this.orderService.getTaxiOrderSuccessRate({
      startTime,
      endTime,
    });
  }
}
