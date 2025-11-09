import { IsString, IsDateString, IsOptional } from 'class-validator';

export class CreateSemesterDto {
  @IsString() name: string;
  @IsDateString() start_date: string;
  @IsDateString() end_date: string;
  @IsOptional() @IsString() status?: string;
}
