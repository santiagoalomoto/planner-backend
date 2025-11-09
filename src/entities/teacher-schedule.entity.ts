import { Entity, PrimaryGeneratedColumn, ManyToOne, Unique } from 'typeorm';
import { Teacher } from './teacher.entity';
import { Timeslot } from './timeslot.entity';
import { Section } from './section.entity';
import { Semester } from './semester.entity';

@Entity({ name: 'teacher_schedule' })
@Unique('uq_teacher_timeslot_semester', ['teacher', 'timeslot', 'semester'])
export class TeacherSchedule {
  @PrimaryGeneratedColumn('uuid') id: string;

  @ManyToOne(() => Teacher, t => t.schedules, { onDelete: 'CASCADE' })
  teacher: Teacher;

  @ManyToOne(() => Timeslot, ts => ts.teacherSchedules, { onDelete: 'CASCADE' })
  timeslot: Timeslot;

  @ManyToOne(() => Section, sec => sec.studentSections, { onDelete: 'CASCADE' })
  section: Section;

  @ManyToOne(() => Semester, sem => sem.offerings, { onDelete: 'CASCADE' })
  semester: Semester;
}
