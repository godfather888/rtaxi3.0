import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CouponEntity } from '@ridy/database';
import { RiderRechargeTransactionType } from '@ridy/database';
import { TransactionAction } from '@ridy/database';
import { TransactionStatus } from '@ridy/database';
import { SharedRiderService } from '@ridy/database';
import { ForbiddenError } from '@nestjs/apollo';
import { Repository } from 'typeorm';
import { RiderWalletDTO } from '../wallet/dto/rider-wallet.dto';

@Injectable()
export class CouponService {
  constructor(private sharedRiderService: SharedRiderService) {}
}
