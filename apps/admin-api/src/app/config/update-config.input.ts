import { InputType, Field, ObjectType } from '@nestjs/graphql';

@InputType()
export class UpdateConfigInput {
  @Field(() => String, { nullable: true })
    backendMapsAPIKey?: string;
  @Field(() => String, { nullable: true })
    adminPanelAPIKey?: string;
  @Field(() => String, { nullable: true })
    twilioAccountSid?: string;
  @Field(() => String, { nullable: true })
    twilioAuthToken?: string;
  @Field(() => String, { nullable: true })
    twilioFromNumber?: string;
  @Field(() => String, { nullable: true })
    twilioVerificationCodeSMSTemplate?: string;
}
