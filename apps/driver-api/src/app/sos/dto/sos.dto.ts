import { IDField } from '@ptc-org/nestjs-query-graphql';
import { ID, ObjectType } from '@nestjs/graphql';

@ObjectType('SOS')
export class SOSDTO {
  @IDField(() => ID)
  id!: number;
}
