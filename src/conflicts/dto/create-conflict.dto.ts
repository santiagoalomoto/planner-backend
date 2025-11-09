import { IsString, IsOptional } from 'class-validator';
export class CreateConflictDto {
  @IsString() type: string;
  @IsOptional() @IsString() entity_id?: string;
  @IsString() description: string;
}
