import { IsInt, IsString, Matches, Min } from 'class-validator';

const TIME_REGEX = /^([01]\d|2[0-3]):([0-5]\d)$/; // HH:MM 24-hour

export class CreateTimeslotDto {
  @IsInt() day_of_week: number;
  @IsString() @Matches(TIME_REGEX)
  start_time: string;
  @IsString() @Matches(TIME_REGEX)
  end_time: string;
  @IsInt() @Min(1) duration_minutes: number;
}
