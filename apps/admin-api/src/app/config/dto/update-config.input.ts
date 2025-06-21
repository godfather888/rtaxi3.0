import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { AppConfigInfoDTO } from '@ridy/database';

@InputType()
export class UpdateConfigInputV2 {
  @Field(() => String, { nullable: true })
    phoneNumber?: string;
  @Field(() => String, { nullable: true })
    email?: string;
  @Field(() => String, { nullable: true })
    firstName?: string;
  @Field(() => String, { nullable: true })
    lastName?: string;
  @Field(() => String, { nullable: true })
    password?: string;
  @Field(() => String, { nullable: true })
    profilePicture?: string;
  @Field(() => String, { nullable: true })
    adminPanelAPIKey?: string;
  @Field(() => String, { nullable: true })
    backendMapsAPIKey?: string;
  @Field(() => String, { nullable: true })
    companyLogo?: string;
  @Field(() => String, { nullable: true })
    companyName?: string;
  @Field(() => AppConfigInfoDTO, { nullable: true })
  taxi?: AppConfigInfoDTO;
  @Field(() => AppConfigInfoDTO, { nullable: true })
  shop?: AppConfigInfoDTO;
  @Field(() => AppConfigInfoDTO, { nullable: true })
  parking?: AppConfigInfoDTO;
  @Field(() => String, { nullable: true })
    mysqlHost?: string;
  @Field(() => Int, { nullable: true })
  mysqlPort?: number;
  @Field(() => String, { nullable: true })
    mysqlUser?: string;
  @Field(() => String, { nullable: true })
    mysqlPassword?: string;
  @Field(() => String, { nullable: true })
    mysqlDatabase?: string;
  @Field(() => String, { nullable: true })
    redisHost?: string;
  @Field(() => Int, { nullable: true })
  redisPort?: number;
  @Field(() => String, { nullable: true })
    redisPassword?: string;
  @Field(() => Int, { nullable: true })
  redisDb?: number;
  @Field(() => String, { nullable: true })
    firebaseProjectPrivateKey?: string;
}
