import { IsString, IsOptional, IsInt } from 'class-validator';

export class CreateOfferingDto {
  @IsString() courseId: string;
  @IsString() semesterId: string;
  @IsOptional() @IsString() teacherId?: string;
  @IsOptional() @IsInt() expected_students?: number;
}
