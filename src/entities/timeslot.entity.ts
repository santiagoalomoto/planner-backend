import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { RoomSchedule } from './room-schedule.entity';
import { TeacherSchedule } from './teacher-schedule.entity';
import { TeacherAvailability } from './teacher-availability.entity';

@Entity({ name: 'timeslots' })
export class Timeslot {
  @PrimaryGeneratedColumn('uuid') id: string;

  @Column('int') day_of_week: number; // 1..7
  @Column('time') start_time: string;
  @Column('time') end_time: string;
  @Column('int') duration_minutes: number;

  @OneToMany(() => RoomSchedule, rs => rs.timeslot)
  roomSchedules: RoomSchedule[];

  @OneToMany(() => TeacherSchedule, ts => ts.timeslot)
  teacherSchedules: TeacherSchedule[];

  @OneToMany(() => TeacherAvailability, ta => ta.timeslot)
  teacherAvailability: TeacherAvailability[];
}
