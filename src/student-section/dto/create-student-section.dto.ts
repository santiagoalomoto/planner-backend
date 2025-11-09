import { IsString } from 'class-validator';

export class CreateStudentSectionDto {
  @IsString() studentId: string;
  @IsString() sectionId: string;
}
