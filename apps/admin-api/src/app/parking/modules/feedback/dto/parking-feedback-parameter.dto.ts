import { ID, ObjectType, Field } from '@nestjs/graphql';
import { IDField, OffsetConnection } from '@ptc-org/nestjs-query-graphql';

@ObjectType('ParkingFeedbackParameter')
@OffsetConnection('feedbacks', () => ParkingFeedbackParameterDTO, {
  enableAggregate: true,
})
export class ParkingFeedbackParameterDTO {
  @IDField(() => ID)
  id: number;
  @Field(() => Boolean, { nullable: false })
    isGood: boolean;
  @Field(() => String, { nullable: false })
    name: string;
}
