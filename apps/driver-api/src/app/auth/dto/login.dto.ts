import { ObjectType, Field } from "@nestjs/graphql";

@ObjectType('Login')
export class LoginDTO {
    @Field(() => String, { nullable: false })
    jwtToken: string;
}