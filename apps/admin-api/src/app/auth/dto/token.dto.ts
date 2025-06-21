import { ObjectType, Field } from "@nestjs/graphql";

@ObjectType()
export class TokenObject {
    @Field(() => String, { nullable: false })
    token: string;
}