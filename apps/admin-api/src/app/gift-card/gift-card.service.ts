import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GiftCodeEntity } from '@ridy/database';
import { GiftBatchEntity } from '@ridy/database';
import { Repository } from 'typeorm';
import { CreateGiftBatchInput } from './dto/create-gift-batch.input';
import { json2csv } from 'json-2-csv';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { OperatorService } from '../operator/operator.service';
import { OperatorPermission } from '@ridy/database';

@Injectable()
export class GiftCardService {
  constructor(
    @InjectRepository(GiftBatchEntity)
    private readonly giftRepository: Repository<GiftBatchEntity>,
    @InjectRepository(GiftCodeEntity)
    private readonly giftCodeRepository: Repository<GiftCodeEntity>,
    private operatorService: OperatorService,
  ) {}

  async createGiftCardBatch(
    input: CreateGiftBatchInput & { operatorId: number },
  ) {
    let gift = this.giftRepository.create({
      name: input.name,
      currency: input.currency,
      amount: input.amount,
      availableFrom: input.availableFrom,
      expireAt: input.expireAt,
      createdByOperatorId: input.operatorId,
    });
    gift = await this.giftRepository.save(gift);
    const giftCodes = Array.from(Array(input.quantity)).map(() => {
      return this.giftCodeRepository.create({
        code: this.generateGiftCode(),
        gift,
      });
    });
    await this.giftCodeRepository.save(giftCodes);
    return gift;
  }

  private generateGiftCode() {
    return Math.random().toString(36).substring(2, 10).toUpperCase();
  }

  async exportGiftCardBatch(input: {
    batchId: number;
    operatorId: number;
  }): Promise<{ url: string }> {
    const { batchId, operatorId } = input;
    await this.operatorService.hasPermission(
      operatorId,
      OperatorPermission.GiftBatch_ViewCodes,
    );
    const result = await this.giftCodeRepository.find({
      where: {
        giftId: batchId,
      },
      select: {
        code: true,
        usedAt: true,
      },
    });
    const str = await json2csv(result);
    const fileName = `${new Date().getTime().toString()}.csv`;
    await writeFile(
      join(process.cwd(), 'uploads', `${new Date().getTime().toString()}.csv`),
      str,
    );
    return {
      url: `uploads/${fileName}`,
    };
  }
}
