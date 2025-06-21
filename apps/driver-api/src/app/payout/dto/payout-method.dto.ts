import {
  Field,
  ID,
  MiddlewareContext,
  NextFn,
  ObjectType,
} from '@nestjs/graphql';
import { GatewayLinkMethod } from '@ridy/database';
import { PaymentGatewayType } from '@ridy/database';
import { Authorize, IDField, Relation } from '@ptc-org/nestjs-query-graphql';
import { PayoutMethodType } from '@ridy/database';
import { MediaDTO } from '../../upload/media.dto';

@ObjectType('PayoutMethod')
@Relation('media', () => MediaDTO, { nullable: true })
@Authorize({
  authorize: (context, authorizationContext) => ({
    enabled: true,
  }),
})
export class PayoutMethodDTO {
  @IDField(() => ID)
  id!: number;
  @Field(() => Boolean, { nullable: false })
  enabled!: boolean;
  @Field(() => String, { nullable: false })
  name!: string;
  @Field(() => PayoutMethodType, { nullable: false })
  type!: PayoutMethodType;
  @Field(() => GatewayLinkMethod, {
    middleware: [
      async (ctx: MiddlewareContext, next: NextFn) => {
        const type = ctx.source.type;
        return type === PaymentGatewayType.Stripe
          ? GatewayLinkMethod.redirect
          : GatewayLinkMethod.manual;
      },
    ],
  })
  linkMethod!: GatewayLinkMethod;
}
