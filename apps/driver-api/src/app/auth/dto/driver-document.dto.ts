import { ID, ObjectType, Field } from '@nestjs/graphql';
import { IDField } from '@ptc-org/nestjs-query-graphql';

@ObjectType('DriverDocument')
export class DriverDocumentDTO {
  @IDField(() => ID)
  id!: number;
  @Field(() => String, { nullable: false })
  title!: string;
  @Field(() => String, { nullable: true })
  description?: string;
  @Field(() => Boolean, { nullable: false })
  isEnabled!: boolean;
  @Field(() => Boolean, { nullable: false })
  isRequired!: boolean;
}
