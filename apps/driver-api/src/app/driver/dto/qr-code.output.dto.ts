import { ObjectType, Field } from "@nestjs/graphql";

@ObjectType()
export class QrCodeOutput {
  @Field()
  qrCodeData!: string;

  @Field()
  expiresAt!: Date;
}
