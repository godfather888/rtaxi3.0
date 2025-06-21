import {
  Authorize,
  FilterableField,
  IDField,
  OffsetConnection,
} from '@ptc-org/nestjs-query-graphql';
import { ID, ObjectType, Field } from '@nestjs/graphql';
import { FeedbackParameterAuthorizer } from './feedback-parameter.authorizer';

@ObjectType('FeedbackParameter')
@Authorize(FeedbackParameterAuthorizer)
@OffsetConnection('feedbacks', () => FeedbackParameterDTO, {
  enableAggregate: true,
})
export class FeedbackParameterDTO {
  @IDField(() => ID)
  id: number;
  @FilterableField()
  title: string;
  @FilterableField()
  isGood: boolean;
}
