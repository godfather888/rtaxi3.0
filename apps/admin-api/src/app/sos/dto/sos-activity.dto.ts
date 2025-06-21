import { IDField, Relation } from '@ptc-org/nestjs-query-graphql';
import { ID, ObjectType, Field, GraphQLISODateTime } from '@nestjs/graphql';
import { SOSActivityAction } from '@ridy/database';
import { OperatorDTO } from '../../operator/dto/operator.dto';

@ObjectType('SOSActivity')
@Relation('operator', () => OperatorDTO)
export class SOSActivityDTO {
  @IDField(() => ID)
  id: number;
  @Field(() => GraphQLISODateTime, { nullable: false })
    createdAt: Date;
  @Field(() => SOSActivityAction, { nullable: false })
    action: SOSActivityAction;
  @Field(() => String, { nullable: true })
    note?: string;
  @Field(() => ID)
    operatorId?: number;
}
