import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { CourseOffering } from './offering.entity';
import { TeacherAvailability } from './teacher-availability.entity';
import { TeacherSchedule } from './teacher-schedule.entity';
import { Section } from './section.entity';

@Entity({ name: 'teachers' })
export class Teacher {
  @PrimaryGeneratedColumn('uuid') id: string;

  @Column() name: string;
  @Column({ unique: true, nullable: true }) email: string;
  @Column('int', { default: 40 }) max_weekly_hours: number;
  @Column({ nullable: true }) notes: string;

  @OneToMany(() => CourseOffering, o => o.teacher)
  offerings: CourseOffering[];

  @OneToMany(() => TeacherAvailability, ta => ta.teacher)
  availability: TeacherAvailability[];

  @OneToMany(() => TeacherSchedule, ts => ts.teacher)
  schedules: TeacherSchedule[];

  @OneToMany(() => Section, s => s.teacher)
  sections: Section[];
}
