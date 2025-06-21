import { InputType, PartialType, Field, ObjectType } from '@nestjs/graphql';
import { CreateRegionInput } from './create-region.input';

@InputType()
export class UpdateRegionInput extends PartialType(CreateRegionInput) {}
