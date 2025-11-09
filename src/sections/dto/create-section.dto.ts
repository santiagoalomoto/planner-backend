import { IsString, IsInt, IsOptional } from 'class-validator';

export class CreateSectionDto {
  @IsString()
  offeringId: string;

  @IsOptional()
  @IsString()
  code?: string;

  @IsInt()
  capacity: number;

  // Opcionales para permitir asignación al crear/actualizar
  @IsOptional()
  @IsString()
  teacherId?: string;

  @IsOptional()
  @IsString()
  assignedTimeslotId?: string;

  @IsOptional()
  @IsString()
  assignedRoomId?: string;

  @IsOptional()
  @IsString()
  semesterId?: string;
}
