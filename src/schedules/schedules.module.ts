import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SchedulesService } from './schedules.service';
import { SchedulesController } from './schedules.controller';
import { RoomSchedule } from '../entities/room-schedule.entity';
import { TeacherSchedule } from '../entities/teacher-schedule.entity';
import { Room } from '../entities/room.entity';
import { Timeslot } from '../entities/timeslot.entity';
import { Section } from '../entities/section.entity';
import { Semester } from '../entities/semester.entity';
import { Teacher } from '../entities/teacher.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RoomSchedule, TeacherSchedule, Room, Timeslot, Section, Semester, Teacher])],
  providers: [SchedulesService],
  controllers: [SchedulesController],
  exports: [SchedulesService],
})
export class SchedulesModule {}
