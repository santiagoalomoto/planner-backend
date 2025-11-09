import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Teacher } from './teacher.entity';
import { Timeslot } from './timeslot.entity';

@Entity({ name: 'teacher_availability' })
export class TeacherAvailability {
  @PrimaryGeneratedColumn('uuid') id: string;

  @ManyToOne(() => Teacher, t => t.availability, { onDelete: 'CASCADE' })
  teacher: Teacher;

  @ManyToOne(() => Timeslot, ts => ts.teacherAvailability, { onDelete: 'CASCADE' })
  timeslot: Timeslot;
}
