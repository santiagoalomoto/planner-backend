import { PartialType } from '@nestjs/mapped-types';
import { CreateConflictDto } from './create-conflict.dto';
export class UpdateConflictDto extends PartialType(CreateConflictDto) {}
