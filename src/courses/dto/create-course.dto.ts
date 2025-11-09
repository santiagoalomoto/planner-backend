import { IsString, IsOptional, IsInt } from 'class-validator';

export class CreateCourseDto {
  @IsString() code: string;
  @IsString() name: string;
  @IsOptional() @IsString() career?: string;
  @IsOptional() @IsInt() credit_hours?: number;
  @IsOptional() @IsString() requires_room_type?: string;
  @IsOptional() @IsInt() preferred_section_size?: number;
}
