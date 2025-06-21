import { NestjsQueryGraphQLModule } from '@ptc-org/nestjs-query-graphql';
import { NestjsQueryTypeOrmModule } from '@ptc-org/nestjs-query-typeorm';
import { Module } from '@nestjs/common';
import { MediaEntity } from '@ridy/database';
import { MediaDTO } from './media.dto';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([MediaEntity])],
      resolvers: [
        {
          DTOClass: MediaDTO,
          EntityClass: MediaEntity,
          create: { disabled: true },
          read: { disabled: true },
          delete: { disabled: true },
          update: { disabled: true },
        },
      ],
    }),
  ],
  providers: [],
  exports: [],
})
export class UploadModule {}
