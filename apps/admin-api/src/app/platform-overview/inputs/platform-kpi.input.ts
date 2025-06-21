import { Field, InputType, registerEnumType, ObjectType } from '@nestjs/graphql';

@InputType()
export class PlatformKPIInput {
  @Field(() => String, { description: 'The currency for the KPI' })
  currency: string;
  @Field(() => KPIPeriod, { description: 'The period for the KPI' })
  period: KPIPeriod;
}

export enum KPIPeriod {
  Last7Days = 'last7Days',
  Last30Days = 'last30Days',
  Last90Days = 'last90Days',
  Last365Days = 'last365Days',
  AllTime = 'allTime',
}

registerEnumType(KPIPeriod, {
  name: 'KPIPeriod',
  description: 'KPI period for the platform overview',
});
