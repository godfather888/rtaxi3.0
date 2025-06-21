import { Args, CONTEXT, Mutation, Resolver } from '@nestjs/graphql';
import { ShopSupportRequestService } from './shop-support-request.service';
import { Inject, UseGuards } from '@nestjs/common';
import type { UserContext } from '../../../auth/authenticated-admin';
import { ShopSupportRequestActivityDTO } from './dto/shop-support-request-activity.dto';
import { CreateShopSupportRequestCommentInput } from './dto/create-shop-support-request-comment.input';
import { AssignShopSupportRequestInput } from './dto/assign-shop-support-request.input';
import { ChangeShopSupportRequestStatusInput } from './dto/change-shop-support-request-status.input';
import { JwtAuthGuard } from '../../../auth/jwt-auth.guard';

@Resolver()
@UseGuards(JwtAuthGuard)
export class ShopSupportRequestResolver {
  constructor(
    private shopSupportRequestService: ShopSupportRequestService,
    @Inject(CONTEXT)
    private context: UserContext,
  ) {}

  @Mutation(() => ShopSupportRequestActivityDTO)
  async addCommentToShopSupportRequest(
    @Args('input') input: CreateShopSupportRequestCommentInput,
  ): Promise<ShopSupportRequestActivityDTO> {
    return this.shopSupportRequestService.addCommentToShopSupportRequest({
      staffId: this.context.req.user.id,
      input,
    });
  }

  @Mutation(() => ShopSupportRequestActivityDTO)
  async assignShopSupportRequestToStaff(
    @Args('input') input: AssignShopSupportRequestInput,
  ): Promise<ShopSupportRequestActivityDTO> {
    return this.shopSupportRequestService.assignShopSupportRequestToStaff({
      staffId: this.context.req.user.id,
      input,
    });
  }

  @Mutation(() => ShopSupportRequestActivityDTO)
  async changeShopSupportRequestStatus(
    @Args('input') input: ChangeShopSupportRequestStatusInput,
  ): Promise<ShopSupportRequestActivityDTO> {
    return this.shopSupportRequestService.changeShopSupportRequestStatus({
      staffId: this.context.req.user.id,
      input,
    });
  }
}
