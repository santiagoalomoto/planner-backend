import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateAuditLogDto {
  @IsOptional()
  @IsString()
  user_id?: string;

  @IsNotEmpty()
  @IsString()
  action: string;

  @IsNotEmpty()
  @IsString()
  entity_type: string;

  @IsOptional()
  @IsString()
  entity_id?: string;

  @IsOptional()
  payload?: any;
}
