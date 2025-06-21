import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ShopCategoryStatus } from '@ridy/database';
import { ShopCategoryEntity } from '@ridy/database';
import { ShopEntity } from '@ridy/database';
import { In, Repository } from 'typeorm';
import { ShopFiltersInput } from './input/shop-filters.input';
import { ShopDeliveryZoneEntity } from '@ridy/database';
import { RiderAddressEntity } from '@ridy/database';
import { DispatcherShopDTO } from './dto/dispatcher-shop.dto';
import { ItemCategoryFiltersInput } from './input/item-category-filters.input';
import { ItemCategoryDTO } from './dto/item-category.dto';
import { ProductCategoryEntity } from '@ridy/database';
import { ShopProductPresetEntity } from '@ridy/database';
import { ShopOrderInput } from './input/shop-order.input';
import { ShopOrderDTO } from './dto/shop-order.dto';
import { ShopOrderEntity } from '@ridy/database';
import { ShopOrderCartEntity } from '@ridy/database';
import { ShopOrderCartProductEntity } from '@ridy/database';
import { ProductOptionEntity } from '@ridy/database';
import { ProductVariantEntity } from '@ridy/database';
import { CalculateDeliveryFeeInput } from './input/calculate-delivery-fee.input';
import { CalculateDeliveryFeeDTO } from './dto/calculate-delivery-fee.dto';
import { CancelShopOrderCartsInput } from './input/cancel-shop-order-carts.input';
import { CartStatus } from '@ridy/database';
import { ShopWalletService } from './shop-wallet.service';
import { TransactionType } from '@ridy/database';
import { ShopTransactionDebitType } from '@ridy/database';
import { TransactionStatus } from '@ridy/database';
import { TransactionAction } from '@ridy/database';
import { RiderRechargeTransactionType } from '@ridy/database';
import { RemoveItemFromCartInput } from './input/remove-item-from-cart.input';
import { SharedCustomerWalletService } from '@ridy/database';
import { DeliveryFeeService } from '@ridy/database';

@Injectable()
export class ShopService {
  constructor(
    private shopWalletService: ShopWalletService,
    private sharedCustomerWalletService: SharedCustomerWalletService,
    @InjectRepository(ShopEntity)
    private shopRepository: Repository<ShopEntity>,
    @InjectRepository(ShopCategoryEntity)
    private shopCategoryRepository: Repository<ShopCategoryEntity>,
    @InjectRepository(ShopDeliveryZoneEntity)
    private shopDeliveryZoneRepository: Repository<ShopDeliveryZoneEntity>,
    @InjectRepository(RiderAddressEntity)
    private riderAddressRepository: Repository<RiderAddressEntity>,
    @InjectRepository(ProductCategoryEntity)
    private itemCategoryRepository: Repository<ProductCategoryEntity>,
    @InjectRepository(ShopProductPresetEntity)
    private shopProductPresetRepository: Repository<ShopProductPresetEntity>,
    @InjectRepository(ShopOrderCartEntity)
    private shopOrderCartRepository: Repository<ShopOrderCartEntity>,
    @InjectRepository(ShopOrderCartProductEntity)
    private shopOrderCartProductRepository: Repository<ShopOrderCartProductEntity>,
    @InjectRepository(ProductVariantEntity)
    private itemVariantRepository: Repository<ProductVariantEntity>,
    @InjectRepository(ProductOptionEntity)
    private itemOptionRepository: Repository<ProductOptionEntity>,
    @InjectRepository(ShopOrderEntity)
    private shopOrderRepository: Repository<ShopOrderEntity>,
    private deliveryFeeService: DeliveryFeeService,
  ) {}

  async getShopCategories() {
    return this.shopCategoryRepository.find({
      where: { status: ShopCategoryStatus.Enabled },
    });
  }

  async getShops(input: ShopFiltersInput): Promise<DispatcherShopDTO[]> {
    const address = await this.riderAddressRepository.findOneByOrFail({
      id: input.addressId,
    });
    const regionQuery =
      this.shopDeliveryZoneRepository.createQueryBuilder('deliveryZone');
    // find delivery regions that are within the address
    regionQuery.where(
      `ST_Within(st_geomfromtext('POINT(:lat :lng)'), deliveryZone.region)`,
      { lat: address.location.lat, lng: address.location.lng },
    );
    const regions = await regionQuery.getMany();
    const regionIds = regions.map((region) => region.id);
    const query = this.shopRepository.createQueryBuilder('shop');
    query.leftJoinAndSelect('shop.deliveryZones', 'deliveryZone');
    query.leftJoinAndSelect('shop.reviews', 'reviews');
    query.leftJoinAndSelect('shop.image', 'image');
    // search where shop is in the category
    if (input.categoryId) {
      query.where('category.id = :categoryId', {
        categoryId: input.categoryId,
      });
    }
    // search where delivery region is within the address
    query.where('deliveryZone.id IN (:...regionIds)', { regionIds });
    // If input.query is not empty, search where shop name contains input.query
    if (input.query) {
      query.where('shop.name LIKE :query', { query: `%${input.query}%` });
    }
    const shops = await query.getMany();
    return shops.map((shop) => {
      // find the first delivery region that is within the address
      const deliveryZone = shop.deliveryZones?.find((region) =>
        regionIds.includes(region.id),
      );
      return {
        ...shop,
        deliveryFee: deliveryZone?.deliveryFee ?? 0,
        minimumOrderAmount: deliveryZone?.minimumOrderAmount ?? 0,
        minDeliveryTime: deliveryZone?.minDeliveryTimeMinutes ?? 0,
        maxDeliveryTime: deliveryZone?.maxDeliveryTimeMinutes ?? 0,
        rating:
          shop.feedbacks?.reduce((acc, review) => acc + review.score, 0) ?? 0,
      };
    });
  }

  async getItemCategories(
    input: ItemCategoryFiltersInput,
  ): Promise<ItemCategoryDTO[]> {
    const queryPreset =
      this.shopProductPresetRepository.createQueryBuilder('preset');
    // search where present belongs to the shop and is within the time
    queryPreset.where('preset.shopId = :shopId', { shopId: input.shopId });
    queryPreset.andWhere(
      `:timeOfDay BETWEEN preset.timeOfDayStart AND preset.timeOfDayEnd`,
      { timeOfDay: input.timeOfDay },
    );
    const presets = await queryPreset.getMany();
    const presetIds = presets.map((preset) => preset.id);

    const queryItemCategory =
      this.itemCategoryRepository.createQueryBuilder('itemCategory');
    queryItemCategory.leftJoinAndSelect('itemCategory.items', 'item');
    // search where the item belongs to the preset
    queryItemCategory.where('item.presetId IN (:...presetIds)', { presetIds });
    const itemCategories = await queryItemCategory.getMany();
    return itemCategories;
  }

  async createOrder(input: ShopOrderInput): Promise<ShopOrderDTO> {
    let shopOrder = new ShopOrderEntity();
    shopOrder.deliveryAddressId = input.deliveryAddressId;
    shopOrder.deliveryMethod = input.deliveryMethod;
    for (const cart of input.carts) {
      const shopOrderCart = new ShopOrderCartEntity();
      shopOrderCart.shopId = cart.shopId;
      shopOrderCart.orderId = shopOrder.id;
      let cartSubtotal = 0;
      for (const item of cart.items) {
        const variant = await this.itemVariantRepository.findOneOrFail({
          where: { id: item.itemVariantId },
        });
        const options = await this.itemOptionRepository.find({
          where: { id: In(item.itemOptionIds) },
        });
        cartSubtotal += variant?.basePrice ?? 0;
        cartSubtotal += options.reduce((acc, option) => acc + option.price, 0);
        const shopOrderCartItem = new ShopOrderCartProductEntity();
        shopOrderCartItem.productVariantId = variant.id;
        shopOrderCartItem.quantity = item.quantity;
        shopOrderCartItem.options = options;
        shopOrderCart.products.push(shopOrderCartItem);
      }
      shopOrderCart.subtotal = cartSubtotal;
      shopOrder.carts?.push(shopOrderCart);
      shopOrder.subTotal += cartSubtotal;
    }
    shopOrder = await this.shopOrderRepository.save(shopOrder);
    return shopOrder;
  }

  async calculateDeliveryFee(
    input: CalculateDeliveryFeeInput,
  ): Promise<CalculateDeliveryFeeDTO> {
    return this.deliveryFeeService.calculateDeliveryFee({
      shopIds: input.carts.map((cart) => cart.shopId),
      deliveryAddressId: input.deliveryAddressId,
      totalItems: input.carts.reduce((acc, cart) => acc + cart.items.length, 0),
      produtIds: input.carts.reduce(
        (acc, cart) => acc.concat(cart.items.map((item) => item.productId)),
        [] as number[],
      ),
    });
  }

  async cancelShopOrderCarts(input: CancelShopOrderCartsInput) {
    const carts = await this.shopOrderCartRepository.find({
      where: { id: In(input.cartIds) },
    });
    const order = await this.shopOrderRepository.findOneOrFail({
      where: { id: carts[0].orderId },
    });
    for (const cart of carts) {
      cart.status = CartStatus.CanceledByShop;
      await this.shopWalletService.recordTransaction({
        status: TransactionStatus.Done,
        shopId: cart.shopId,
        currency: order.currency,
        amount: cart.subtotal,
        transactionDate: new Date(),
        type: TransactionType.Debit,
        debitType: ShopTransactionDebitType.Refund,
        shopOrderCartId: cart.id,
      });
      await this.sharedCustomerWalletService.rechargeWallet({
        status: TransactionStatus.Done,
        currency: order.currency,
        amount: cart.subtotal,
        action: TransactionAction.Recharge,
        rechargeType: RiderRechargeTransactionType.Correction,
        riderId: order.customerId,
      });
    }
    await this.shopOrderCartRepository.save(carts);
  }

  async removeItemFromCart(input: RemoveItemFromCartInput) {
    const cart = await this.shopOrderCartRepository.findOneOrFail({
      where: { id: input.cartId },
      relations: {
        products: true,
        order: true,
      },
    });
    let refundable = 0;
    input.cancelables.forEach(async (cancelable) => {
      const cartItem = await this.shopOrderCartProductRepository.findOne({
        where: { id: cancelable.shopOrderCartItemId },
      });
      this.shopOrderCartProductRepository.update(
        cancelable.shopOrderCartItemId,
        {
          canceledQuantity: cancelable.cancelQuantity,
        },
      );
      refundable += cancelable.cancelQuantity * (cartItem?.priceEach ?? 0);
    });
    cart.subtotal -= refundable;
    await this.shopWalletService.recordTransaction({
      status: TransactionStatus.Done,
      shopId: cart.shopId,
      currency: cart.order.currency,
      amount: refundable,
      transactionDate: new Date(),
      type: TransactionType.Debit,
      debitType: ShopTransactionDebitType.Refund,
      shopOrderCartId: cart.id,
    });
    await this.sharedCustomerWalletService.rechargeWallet({
      status: TransactionStatus.Done,
      currency: cart.order.currency,
      amount: refundable,
      action: TransactionAction.Recharge,
      rechargeType: RiderRechargeTransactionType.Correction,
      riderId: cart.order.customerId,
    });
    await this.shopOrderCartRepository.save(cart);
  }
}
