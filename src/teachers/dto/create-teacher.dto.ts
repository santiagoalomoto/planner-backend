  import { IsString, IsOptional, IsEmail, IsInt } from 'class-validator';

  export class CreateTeacherDto {
    @IsString() name: string;
    @IsOptional() @IsEmail() email?: string;
    @IsOptional() @IsInt() max_weekly_hours?: number;
    @IsOptional() @IsString() notes?: string;
  }
