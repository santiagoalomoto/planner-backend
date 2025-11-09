import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SectionsService } from './sections.service';
import { SectionsController } from './sections.controller';
import { Section } from '../entities/section.entity';
import { Teacher } from '../entities/teacher.entity';
import { Timeslot } from '../entities/timeslot.entity';
import { RoomSchedule } from '../entities/room-schedule.entity';
import { Room } from '../entities/room.entity';
import { Semester } from '../entities/semester.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Section, Teacher, Timeslot, RoomSchedule, Room, Semester])],
  providers: [SectionsService],
  controllers: [SectionsController],
  exports: [SectionsService],
})
export class SectionsModule {}
