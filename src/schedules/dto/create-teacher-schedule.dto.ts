import { IsString } from 'class-validator';

export class CreateTeacherScheduleDto {
  @IsString() teacherId: string;
  @IsString() timeslotId: string;
  @IsString() sectionId: string;
  @IsString() semesterId: string;
}
