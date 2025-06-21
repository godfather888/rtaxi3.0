import { Field, Float, ObjectType } from '@nestjs/graphql';

@ObjectType('RetentionRate')
export class RetentionRateDTO {
  @Field(() => Date, {
    description: 'Any date within the range of revenue interval.',
  })
  date: Date;
  @Field(() => Float)
  retentionRate: number;
}
