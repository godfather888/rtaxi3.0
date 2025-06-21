import { ObjectType, registerEnumType, Field, Float } from "@nestjs/graphql";

export enum TimeQuery {
    Daily = 'daily',
    Weekly = 'weekly',
    Monthly = 'monthly'
}

registerEnumType(TimeQuery, { name: 'TimeQuery' });

@ObjectType()
export class StatisticsResult {
    @Field(() => String, { nullable: false })
    currency: string;
    @Field(() => [Datapoint], { nullable: false })
    dataset: Datapoint[];
}

@ObjectType()
export class Datapoint {
    @Field(() => String, { nullable: false })
    name: string;
    @Field(() => String, { nullable: false })
    current: string;
    @Field(() => Float, { nullable: false })
    earning: number;
    @Field(() => Float, { nullable: false })
    count: number;
    @Field(() => Float, { nullable: false })
    distance: number;
    @Field(() => Float, { nullable: false })
    time: number;
}