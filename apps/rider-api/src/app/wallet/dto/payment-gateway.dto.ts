import {
  Authorize,
  FilterableField,
  IDField,
  Relation,
} from '@ptc-org/nestjs-query-graphql';
import {
  Field,
  ID,
  MiddlewareContext,
  NextFn,
  ObjectType,
} from '@nestjs/graphql';
import { PaymentGatewayType } from '@ridy/database';
import { MediaDTO } from '../../upload/media.dto';
import { GatewayLinkMethod } from '@ridy/database';

@ObjectType('PaymentGateway')
@Authorize({
  authorize: (context) => ({
    enabled: true,
  }),
})
@Relation('media', () => MediaDTO, {
  nullable: true,
})
export class PaymentGatewayDTO {
  @IDField(() => ID)
  id!: number;
  @FilterableField(() => Boolean, { nullable: false })
  enabled!: boolean;
  @Field(() => String, { nullable: false })
  title!: string;
  @Field(() => PaymentGatewayType, { nullable: false })
  type!: PaymentGatewayType;
  @Field(() => String, { nullable: true })
  publicKey?: string;
  @Field(() => GatewayLinkMethod, {
    middleware: [
      async (ctx: MiddlewareContext, next: NextFn) => {
        const type = ctx.source.type;
        return type === PaymentGatewayType.Stripe
          ? GatewayLinkMethod.redirect
          : GatewayLinkMethod.none;
      },
    ],
  })
  linkMethod!: GatewayLinkMethod;
}
