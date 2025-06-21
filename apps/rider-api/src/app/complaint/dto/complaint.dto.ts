import { IDField } from '@ptc-org/nestjs-query-graphql';
import { ID, ObjectType, Field } from '@nestjs/graphql';
import { ComplaintStatus } from '@ridy/database';

@ObjectType('Complaint')
export class ComplaintDTO {
  @IDField(() => ID)
  id!: number;
  @Field(() => String, { nullable: false })
  subject!: string;
  @Field(() => String, { nullable: true })
  content?: string;
  @Field(() => ComplaintStatus, { nullable: false })
  status!: ComplaintStatus;
}
