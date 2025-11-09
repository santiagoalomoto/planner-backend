import { IsString } from 'class-validator';

export class CreateRoomScheduleDto {
  @IsString() roomId: string;
  @IsString() timeslotId: string;
  @IsString() sectionId: string;
  @IsString() semesterId: string;
}
