import { IDField } from '@ptc-org/nestjs-query-graphql';
import {
  Field,
  ID,
  MiddlewareContext,
  NextFn,
  ObjectType,
} from '@nestjs/graphql';
import urlJoin from 'proper-url-join';

@ObjectType('Media')
export class MediaDTO {
  @IDField(() => ID)
  id!: number;
  @Field(() => String, {
    middleware: [
      async (
        ctx: MiddlewareContext,
        next: NextFn,
      ): Promise<Promise<string> | string> => {
        let value: string = await next();
        // Используем CDN_URL или fallback на базовый URL
        const cdnUrl = process.env.CDN_URL || 'http://194.32.141.250/uploads';
        value = urlJoin(cdnUrl, value);
        return value;
      },
    ],
  })
  address!: string;
  @Field(() => String, { nullable: true })
  base64?: string;
  @Field(() => ID, { nullable: true })
  driverDocumentId?: number;
}
