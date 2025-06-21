import { Resolver, Query, Args, Mutation, ID } from '@nestjs/graphql';
import { ShopService } from './shop.service';
import { ShopFiltersInput } from './input/shop-filters.input';
import { DispatcherShopDTO } from './dto/dispatcher-shop.dto';
import { ItemCategoryDTO } from './dto/item-category.dto';
import { ItemCategoryFiltersInput } from './input/item-category-filters.input';
import { ShopOrderDTO } from './dto/shop-order.dto';
import { ShopOrderInput } from './input/shop-order.input';
import { CalculateDeliveryFeeDTO } from './dto/calculate-delivery-fee.dto';
import { CalculateDeliveryFeeInput } from './input/calculate-delivery-fee.input';
import { CancelShopOrderCartsInput } from './input/cancel-shop-order-carts.input';
import { RemoveItemFromCartInput } from './input/remove-item-from-cart.input';
import { ForbiddenError } from '@nestjs/apollo';
import { ShopLoginSessionService } from './shop-login-session.service';

@Resolver()
export class ShopResolver {
  constructor(
    private shopService: ShopService,
    private shopLoginSessionService: ShopLoginSessionService,
  ) {}

  //   @Query(() => [ShopCategoryDTO])
  //   async shopCategories() {
  //     return this.shopService.getShopCategories();
  //   }

  @Query(() => [DispatcherShopDTO])
  async dispatcherShops(
    @Args('input', { type: () => ShopFiltersInput }) input: ShopFiltersInput,
  ): Promise<DispatcherShopDTO[]> {
    return this.shopService.getShops(input);
  }

  @Query(() => [ItemCategoryDTO])
  async itemCategories(
    @Args('input', { type: () => ItemCategoryFiltersInput })
    input: ItemCategoryFiltersInput,
  ): Promise<ItemCategoryDTO[]> {
    return this.shopService.getItemCategories(input);
  }

  @Query(() => CalculateDeliveryFeeDTO)
  async calculateDeliveryFee(
    @Args('input', { type: () => CalculateDeliveryFeeInput })
    input: CalculateDeliveryFeeInput,
  ): Promise<CalculateDeliveryFeeDTO> {
    return this.shopService.calculateDeliveryFee(input);
  }

  @Mutation(() => ShopOrderDTO, { name: 'createShopOrder' })
  async createOrder(
    @Args('input', { type: () => ShopOrderInput }) input: ShopOrderInput,
  ): Promise<ShopOrderDTO> {
    return this.shopService.createOrder(input);
  }

  @Mutation(() => ShopOrderDTO)
  async cancelShopOrderCarts(
    @Args('input', { type: () => CancelShopOrderCartsInput })
    input: CancelShopOrderCartsInput,
  ) {
    return this.shopService.cancelShopOrderCarts(input);
  }

  @Mutation(() => ShopOrderDTO)
  async removeItemFromCart(
    @Args('input', { type: () => RemoveItemFromCartInput })
    input: RemoveItemFromCartInput,
  ) {
    return this.shopService.removeItemFromCart(input);
  }

  @Mutation(() => Boolean)
  async terminateShopLoginSession(
    @Args('sessionId', { type: () => ID }) sessionId: string,
  ) {
    if (process.env.DEMO_MODE != null) {
      throw new ForbiddenError('Action not allowed in demo mode.');
    }
    const result = await this.shopLoginSessionService.terminateLoginSession(
      sessionId,
    );
    return result.affected > 0;
  }
}
