import {
  Authorize,
  FilterableField,
  IDField,
  Relation,
  UnPagedRelation,
} from '@ptc-org/nestjs-query-graphql';
import { ID, ObjectType, Field, GraphQLISODateTime } from '@nestjs/graphql';
import { OperatorRoleDTO } from './operator-role.dto';
import { OperatorAuthorizer } from './operator.authorizer';
import { MediaDTO } from '../../upload/media.dto';
import { OperatorSessionDTO } from './operator-session.dto';
import { EnabledNotification } from '@ridy/database';

@ObjectType('Operator')
@Relation('role', () => OperatorRoleDTO, { nullable: true })
@Relation('media', () => MediaDTO, { nullable: true })
@UnPagedRelation('sessions', () => OperatorSessionDTO)
@Authorize(OperatorAuthorizer)
export class OperatorDTO {
  @IDField(() => ID)
  id!: number;
  @FilterableField(() => String, { nullable: true })
  firstName?: string;
  @Field(() => GraphQLISODateTime, { nullable: true })
  createdAt?: Date;
  @Field(() => GraphQLISODateTime, { nullable: true })
  updatedAt?: Date;
  @FilterableField(() => String, { nullable: true })
  lastName?: string;
  @FilterableField(() => String, { nullable: false })
  userName!: string;
  @FilterableField(() => String, { nullable: true })
  mobileNumber?: string;
  @Field(() => GraphQLISODateTime, { nullable: true })
  lastActivity?: Date;
  @Field(() => [EnabledNotification], { nullable: false })
  enabledNotifications!: EnabledNotification[];
  @FilterableField(() => Boolean, { nullable: false })
  isBlocked!: boolean;
  @FilterableField(() => String, { nullable: true })
  email?: string;
  @FilterableField(() => ID, { nullable: true })
  roleId?: number;
}
