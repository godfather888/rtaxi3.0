import { Field, ID, ObjectType, GraphQLISODateTime } from '@nestjs/graphql';
import {
  FilterableField,
  IDField,
  Relation,
} from '@ptc-org/nestjs-query-graphql';
import { DriverDTO } from '../../driver/dto/driver.dto';
import { DriverDocumentDTO } from './driver-document.dto';
import { MediaDTO } from '../../upload/media.dto';
import { DriverDocumentRetentionPolicyDTO } from './driver-document-retention-policy.dto';

@ObjectType('DriverToDriverDocument')
@Relation('driver', () => DriverDTO)
@Relation('driverDocument', () => DriverDocumentDTO)
@Relation('media', () => MediaDTO)
@Relation('retentionPolicy', () => DriverDocumentRetentionPolicyDTO, {
  nullable: true,
})
export class DriverToDriverDocumentDTO {
  @IDField(() => ID)
  id: number;

  @FilterableField(() => ID)
  driverId: number;

  @Field(() => ID)
  driverDocumentId: number;

  @Field(() => ID)
  mediaId: number;

  @Field(() => ID)
  retentionPolicyId?: number;

  @Field(() => GraphQLISODateTime, { nullable: true })
    expiresAt?: Date;
}
