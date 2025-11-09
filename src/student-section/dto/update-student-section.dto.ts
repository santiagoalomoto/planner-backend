import { PartialType } from '@nestjs/mapped-types';
import { CreateStudentSectionDto } from './create-student-section.dto';

export class UpdateStudentSectionDto extends PartialType(CreateStudentSectionDto) {}
