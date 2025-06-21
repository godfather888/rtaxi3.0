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
  id: number;
  @Field(() => String, {
    middleware: [
      async (
        ctx: MiddlewareContext,
        next: NextFn,
      ): Promise<Promise<string> | string> => {
        let value: string = await next();
        value = urlJoin(process.env.CDN_URL, value);
        return value;
      },
    ],
  })
  address: string;
  @Field(() => String, { nullable: true })
    base64?: string;
}
