import { IsString, IsOptional, IsIn } from 'class-validator';

export type ConflictEntityType = 'professor' | 'student';

export class CreateConflictDto {
  @IsString() type: string;
  @IsOptional() @IsString() entity_id?: string;
  @IsOptional() @IsIn(['professor', 'student'])
  entity_type?: ConflictEntityType;
  @IsString() description: string;
}
