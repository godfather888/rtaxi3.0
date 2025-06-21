import { NestjsQueryGraphQLModule } from '@ptc-org/nestjs-query-graphql';
import { NestjsQueryTypeOrmModule } from '@ptc-org/nestjs-query-typeorm';
import { Module } from '@nestjs/common';
import { DriverEntity } from '@ridy/database';
import { MediaEntity } from '@ridy/database';
import { MediaDTO } from './media.dto';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [
        NestjsQueryTypeOrmModule.forFeature([MediaEntity, DriverEntity]),
      ],
      resolvers: [
        {
          EntityClass: MediaEntity,
          DTOClass: MediaDTO,
          create: { disabled: true },
          read: { disabled: true },
          delete: { disabled: true },
          update: { disabled: true },
        },
      ],
    }),
  ],
  providers: [],
  exports: [NestjsQueryGraphQLModule],
})
export class UploadModule {}
