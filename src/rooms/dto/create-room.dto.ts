import { IsString, IsInt, IsOptional } from 'class-validator';

export class CreateRoomDto {
  @IsString() code: string;
  @IsString() name: string;
  @IsInt() capacity: number;
  @IsOptional() @IsString() type?: string;
  @IsOptional() features?: any;
}
