import {
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
  Logger,
  Query,
  Body,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { RiderRechargeTransactionType } from '@ridy/database';
import { TransactionAction } from '@ridy/database';
import { TransactionStatus } from '@ridy/database';
import { Response, Request } from 'express';
import { extname } from 'path';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

import { RestJwtAuthGuard } from './auth/rest-jwt-auth.guard';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerEntity } from '@ridy/database';
import { Repository } from 'typeorm';
import { MediaEntity } from '@ridy/database';
import { CryptoService } from '@ridy/database';
import { RiderOrderService } from './order/rider-order.service';
import { SharedOrderService } from '@ridy/database';
import { InjectPubSub } from '@ptc-org/nestjs-query-graphql';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { OrderStatus } from '@ridy/database';
import { PaymentEntity } from '@ridy/database';
import { SharedCustomerWalletService } from '@ridy/database';
import urlJoin from 'proper-url-join';

@Controller()
export class RiderAPIController {
  constructor(
    private readonly sharedCustomerWalletService: SharedCustomerWalletService,
    private sharedOrderService: SharedOrderService,
    private riderOrderService: RiderOrderService,
    private cryptoService: CryptoService,
    @InjectPubSub()
    private pubSub: RedisPubSub,
    @InjectRepository(CustomerEntity)
    private riderRepository: Repository<CustomerEntity>,
    @InjectRepository(PaymentEntity)
    private paymentRepository: Repository<PaymentEntity>,
    @InjectRepository(MediaEntity)
    private mediaRepository: Repository<MediaEntity>,
  ) {}

  @Get()
  async defaultPath(@Res() res: Response) {
    res.send(`✅ Rider API microservice running.\nVersion: 4.0.0`);
  }

  @Get('payment_result')
  async verifyPayment(
    @Query() query: { token: string; redirect: '1' | '0' },
    @Res() res: Response,
  ): Promise<void> {
    const token = query.token;
    const decrypted = await this.cryptoService.decrypt(token);
    Logger.log('Payment:' + JSON.stringify(decrypted));

    if (decrypted.userType == 'client' || decrypted.userType == 'rider') {
      if (decrypted.status == 'success') {
        await this.sharedCustomerWalletService.rechargeWallet({
          riderId: decrypted.userId,
          amount: decrypted.amount,
          currency: decrypted.currency,
          refrenceNumber: decrypted.transactionNumber,
          action: TransactionAction.Recharge,
          rechargeType: RiderRechargeTransactionType.InAppPayment,
          paymentGatewayId: decrypted.gatewayId,
          status: TransactionStatus.Done,
        });
        await this.paymentRepository.delete({
          transactionNumber: decrypted.transactionNumber,
        });
        let order = await this.riderOrderService.getCurrentOrder(
          decrypted.userId,
        );
        if (order?.status == OrderStatus.WaitingForPostPay) {
          await this.sharedOrderService.finish(order.id);
          order = await this.riderOrderService.getCurrentOrder(
            decrypted.userId,
          );
          this.pubSub.publish('orderUpdated', { orderUpdated: order });
        } else if (order?.status == OrderStatus.WaitingForPrePay) {
          order = await this.sharedOrderService.processPrePay(order.id);
          this.pubSub.publish('orderUpdated', { orderUpdated: order });
        }
        if (query.redirect == null || query.redirect == '1')
          res.redirect(
            301,
            `${
              process.env.RIDER_APPLICATION_ID ?? 'default.rider.redirection'
            }://`,
          );
        res.send(
          'Transaction successful. Close this page and go back to the app.',
        );
      } else if (decrypted.status == 'authorized') {
        let order = await this.riderOrderService.getCurrentOrder(
          decrypted.userId,
        );
        if (!order) {
          res.status(404).send('Order not found');
        }
        order = await this.sharedOrderService.processPrePay(
          order!.id,
          decrypted.amount,
        );
        this.pubSub.publish('orderUpdated', { orderUpdated: order });
        res.redirect(
          301,
          `${
            process.env.RIDER_APPLICATION_ID ?? 'default.rider.redirection'
          }://`,
        );
        res.send(
          'Transaction successful. Close this page and go back to the app.',
        );
      } else {
        res.redirect(
          301,
          `${
            process.env.RIDER_APPLICATION_ID ?? 'default.rider.redirection'
          }://`,
        );
        res.send(
          "Transaction wasn't successful. You can go back to the app and redo this.",
        );
      }
    }
  }

  @Post('saved_payment_method_charged')
  async savedPaymentMethodCharged(
    @Body() body: { token: string },
    @Res() res: Response,
  ) {
    const token = body.token;
    const decrypted = await this.cryptoService.decrypt(token);
    Logger.log('Payment:' + JSON.stringify(decrypted));
    const payment = await this.paymentRepository.findOneOrFail({
      where: { transactionNumber: decrypted.transactionNumber },
    });
    if (decrypted.status == 'success') {
      await this.sharedCustomerWalletService.rechargeWallet({
        riderId: parseInt(payment.userId),
        amount: payment.amount,
        currency: payment.currency,
        refrenceNumber: payment.transactionNumber,
        action: TransactionAction.Recharge,
        rechargeType: RiderRechargeTransactionType.InAppPayment,
        paymentGatewayId: payment.gatewayId,
        savedPaymentMethodId: payment.savedPaymentMethodId,
        status: TransactionStatus.Done,
      });
      await this.paymentRepository.delete({
        transactionNumber: decrypted.transactionNumber,
      });
      let order = await this.riderOrderService.getCurrentOrder(
        parseInt(payment.userId),
      );
      if (order?.status == OrderStatus.WaitingForPostPay) {
        await this.sharedOrderService.finish(order.id);
        order = await this.riderOrderService.getCurrentOrder(
          parseInt(payment.userId),
        );
        this.pubSub.publish('orderUpdated', { orderUpdated: order });
      } else if (order?.status == OrderStatus.WaitingForPrePay) {
        order = await this.sharedOrderService.processPrePay(order.id);
        this.pubSub.publish('orderUpdated', { orderUpdated: order });
      }
    }
    res.send('OK');
  }

  @Get('success_attach')
  async successAttach(@Req() req: Request, @Res() res: Response) {
    res.redirect(
      301,
      `${process.env.RIDER_APPLICATION_ID ?? 'default.rider.redirection'}://`,
    );
  }

  @Post('upload_profile')
  @UseGuards(RestJwtAuthGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads', // Directory to save files
        filename: (req: Request, file: Express.Multer.File, cb) => {
          // Generating a unique filename
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
      limits: {
        fileSize: 1024 * 1024 * 10, // 10MB limit
      },
      fileFilter: (
        req: Request,
        file,
        cb: (error: Error | null, accept: boolean) => void,
      ) => {
        // Only allow images
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
          return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
      },
    }),
  )
  async upload(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const insert = await this.mediaRepository.insert({
      address: file.filename,
    });
    await this.riderRepository.update((req as unknown as any).user.id, {
      mediaId: insert.raw.insertId,
    });
    res.send({
      id: insert.raw.insertId.toString(),
      address: urlJoin(process.env.CDN_URL, file.filename),
    });
  }

  @Get('/debug-sentry')
  getError() {
    throw new Error('My first Sentry error!');
  }
}
