import { ID, ObjectType, Field } from '@nestjs/graphql';
import { IDField, OffsetConnection } from '@ptc-org/nestjs-query-graphql';
import { Column } from 'typeorm';
import { RegionDTO } from './region.dto';

@ObjectType('RegionCategory')
@OffsetConnection('regions', () => RegionDTO)
export class RegionCategoryDTO {
  @IDField(() => ID)
  id!: number;

  @Column()
    @Field(() => String, { nullable: false })
  name!: string;

  @Column()
    @Field(() => String, { nullable: false })
  currency: string;
}
