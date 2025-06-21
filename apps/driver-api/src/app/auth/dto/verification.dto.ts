import { ObjectType, Field } from '@nestjs/graphql';
import { DriverDTO } from '../../driver/dto/driver.dto';

@ObjectType('VerifcationResult')
export class VerificationDto {
  @Field(() => String, { nullable: false })
    jwtToken: string;
  @Field(() => DriverDTO, { nullable: false })
    user: DriverDTO;
  @Field(() => Boolean, { nullable: false })
    hasPassword: boolean;
  @Field(() => Boolean, { nullable: false })
    hasName: boolean;
}
