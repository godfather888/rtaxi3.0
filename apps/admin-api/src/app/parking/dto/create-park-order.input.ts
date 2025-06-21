import {
  Field,
  ID,
  InputType,
  ObjectType,
  GraphQLISODateTime,
} from '@nestjs/graphql';
import { ParkSpotCarSize } from '@ridy/database';
import { ParkSpotVehicleType } from '@ridy/database';
import { PaymentMode } from '@ridy/database';

@InputType()
export class CreateParkOrderInput {
  @Field(() => ParkSpotVehicleType, { nullable: false })
  vehicleType!: ParkSpotVehicleType;
  @Field(() => GraphQLISODateTime, { nullable: false })
  enterTime!: Date;
  @Field(() => GraphQLISODateTime, { nullable: false })
  exitTime!: Date;
  @Field(() => ID)
  parkSpotId!: number;
  @Field(() => ParkSpotCarSize, { nullable: true })
  carSize?: ParkSpotCarSize;
  @Field(() => PaymentMode, { nullable: false })
  paymentMode!: PaymentMode;
  @Field(() => ID, { nullable: true })
  paymentMethodId?: number;
}
