import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentSection } from '../entities/student-section.entity';
import { StudentSectionService } from './student-section.service';
import { StudentSectionController } from './student-section.controller';
import { Student } from '../entities/student.entity';
import { Section } from '../entities/section.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StudentSection, Student, Section])],
  providers: [StudentSectionService],
  controllers: [StudentSectionController],
  exports: [StudentSectionService],
})
export class StudentSectionModule {}
