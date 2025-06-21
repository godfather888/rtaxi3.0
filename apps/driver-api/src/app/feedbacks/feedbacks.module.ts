import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeedbackEntity } from '@ridy/database';
import { FeedbacksService } from './feedbacks.service';
import { FeedbacksResolver } from './feedbacks.resolver';
import { DriverEntity } from '@ridy/database';

@Module({
  imports: [TypeOrmModule.forFeature([FeedbackEntity, DriverEntity])],
  providers: [FeedbacksService, FeedbacksResolver],
  exports: [],
})
export class FeedbacksModule {}
