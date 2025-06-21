import { ID, ObjectType, Field, Float } from '@nestjs/graphql';
import { IDField, Relation } from '@ptc-org/nestjs-query-graphql';
import { ItemDTO } from './item.dto';

@ObjectType('ItemVariant')
@Relation('item', () => ItemDTO)
export class ItemVariantDTO {
  @IDField(() => ID)
  id!: number;
  @Field(() => String, { nullable: false })
    name!: string;
  @Field(() => String, { nullable: true })
    description?: string;
  @Field(() => Float, { nullable: false })
    price!: number;
}
