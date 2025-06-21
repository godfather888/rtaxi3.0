import { createUnionType, Field, ObjectType } from '@nestjs/graphql';
import { ProviderWalletDTO } from './provider-wallet.dto';
import { FleetWalletDTO } from '../../fleet/dto/fleet-wallet.dto';
import { RiderWalletDTO } from '../../customer/dto/rider-wallet.dto';
import { DriverWalletDTO } from '../../driver/dto/driver-wallet.dto';
import { ShopWalletDTO } from '../../shop/dto/shop-wallet.dto';

export const WalletUnion = createUnionType({
  name: 'Wallet',
  types: () =>
    [
      ProviderWalletDTO,
      FleetWalletDTO,
      RiderWalletDTO,
      DriverWalletDTO,
      ShopWalletDTO,
    ] as const,
});
