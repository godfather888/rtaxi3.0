import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { RestJwtAuthGuard } from './auth/rest-jwt-auth.guard';
import { InjectRepository } from '@nestjs/typeorm';
import { DriverEntity } from '@ridy/database';
import { MediaEntity } from '@ridy/database';
import { Repository } from 'typeorm';
import { extname } from 'path';
import { CryptoService } from '@ridy/database';
import { SharedDriverService } from '@ridy/database';
import { TransactionAction } from '@ridy/database';
import { DriverRechargeTransactionType } from '@ridy/database';
import { TransactionStatus } from '@ridy/database';
import { PaymentEntity } from '@ridy/database';
import { DriverToDriverDocumentEntity } from '@ridy/database';
import urlJoin from 'proper-url-join';
import { Request, Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller()
export class DriverAPIController {
  constructor(
    @InjectRepository(MediaEntity)
    private mediaRepository: Repository<MediaEntity>,
    @InjectRepository(DriverToDriverDocumentEntity)
    private driverDocumentRepository: Repository<DriverToDriverDocumentEntity>,
    @InjectRepository(DriverEntity)
    private driverRepository: Repository<DriverEntity>,
    @InjectRepository(PaymentEntity)
    private paymentRepository: Repository<PaymentEntity>,
    private cryptoService: CryptoService,
    private sharedDriverService: SharedDriverService,
  ) {}

  @Get()
  async defaultPath(@Res() res: Response) {
    res.send(`✅ Driver API microservice running.\nVersion: 4.0.0`);
  }

  @Get('payment_result')
  async verifyPayment(@Req() req: Request, @Res() res: Response) {
    const token = req.query.token;
    const decrypted = await this.cryptoService.decrypt(token as string);
    if (decrypted.userType == 'driver') {
      if (decrypted.status == 'success') {
        await this.sharedDriverService.rechargeWallet({
          driverId: decrypted.userId,
          amount: decrypted.amount,
          currency: decrypted.currency,
          refrenceNumber: decrypted.transactionNumber,
          action: TransactionAction.Recharge,
          rechargeType: DriverRechargeTransactionType.InAppPayment,
          paymentGatewayId: decrypted.gatewayId,
          status: TransactionStatus.Done,
        });
        await this.paymentRepository.delete({
          transactionNumber: decrypted.transactionNumber,
        });
      }
    }
    res.redirect(
      `${process.env.DRIVER_APPLICATION_ID ?? 'default.driver.redirection'}://`,
    );
  }

  @Get('success_message')
  async successMessage(
    @Query() query: { id_order: string },
    @Body() body: { posted_data: string },
    @Res() res: Response,
  ) {
    res.send('Transaction successful. Close this page and go back to the app.');
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
    const insert = await this.mediaRepository.save({ address: file.filename });
    await this.driverRepository.update((req as unknown as any).user.id, {
      mediaId: insert.id,
    });
    insert.id = insert.id.toString() as unknown as any;
    
    // Используем CDN_URL или базовый URL driver-api
    const cdnUrl = process.env.CDN_URL || 'http://194.32.141.250/uploads';
    
    res.send({
      id: insert.id,
      address: urlJoin(cdnUrl, file.filename),
    });
  }

  @Post('upload_document')
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
  async uploadDocument(
    @UploadedFile()
    file: Express.Multer.File,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    // Проверяем что файл загружен
    if (!file) {
      console.error('No file uploaded! Request body:', req.body);
      console.error('Request headers:', req.headers);
      return res.status(400).send({
        error: 'No file uploaded',
        message: 'Please select a file to upload'
      });
    }
    
    const insert = await this.mediaRepository.save({
      address: file.filename,
      driverDocumentId: (req as unknown as any).user.id,
    });
    insert.id = parseInt(insert.id.toString() as unknown as string);
    const doc = this.driverDocumentRepository.create();
    doc.driverId = (req as unknown as any).user.id;
    doc.driverDocumentId = parseInt(req.body.requestedDocumentId);
    
    // Используем CDN_URL или базовый URL driver-api
    const cdnUrl = process.env.CDN_URL || 'http://194.32.141.250/uploads';
    
    res.send({
      id: insert.id,
      address: urlJoin(cdnUrl, file.filename),
    });
  }

  @Post('upload_media')
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
  async uploadMedia(
    @UploadedFile()
    file: Express.Multer.File,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const insert = await this.mediaRepository.save({
      address: file.filename,
      uploadedByDriverId: (req as unknown as any).user.id,
    });
    insert.id = insert.id.toString() as unknown as any;
    res.send({
      id: insert.id,
      address: urlJoin(process.env.CDN_URL, file.filename),
    });
  }

  @Get('/debug-sentry')
  getError() {
    throw new Error('My first Sentry error!');
  }
}
