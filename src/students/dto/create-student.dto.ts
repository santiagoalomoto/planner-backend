import { IsString, IsOptional, IsInt, IsEmail } from 'class-validator';

export class CreateStudentDto {
  @IsOptional() @IsString() student_number?: string;
  @IsString() name: string;
  @IsOptional() @IsEmail() email?: string; // agregado
  @IsOptional() @IsString() career?: string;
  @IsOptional() @IsInt() semester_academic?: number;
  @IsOptional() @IsString() courseId?: string;
  @IsOptional() @IsString() semesterId?: string;
}
