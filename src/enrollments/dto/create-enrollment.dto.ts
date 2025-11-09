import { IsString } from 'class-validator';

export class CreateEnrollmentDto {
  @IsString()
  studentId: string;

  @IsString()
  offeringId: string;

  @IsString()
  sectionId: string;
}
