import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { CourseOffering } from './offering.entity';
import { Room } from './room.entity';
import { Timeslot } from './timeslot.entity';
import { StudentSection } from './student-section.entity';
import { Teacher } from './teacher.entity';
import { Semester } from './semester.entity';

@Entity({ name: 'sections' })
export class Section {
  @PrimaryGeneratedColumn('uuid') id: string;

  @ManyToOne(() => CourseOffering, o => o.sections, { onDelete: 'CASCADE' })
  offering: CourseOffering;

  @Column({ nullable: true }) code: string;
  @Column('int') capacity: number;

  @ManyToOne(() => Room, r => r.sections, { nullable: true })
  assigned_room: Room;

  @ManyToOne(() => Timeslot, ts => ts.roomSchedules, { nullable: true })
  assigned_timeslot: Timeslot;

  @ManyToOne(() => Teacher, t => t.sections, { nullable: true })
  teacher: Teacher;

  @ManyToOne(() => Semester, s => s.offerings, { nullable: true })
  semester: Semester;

  @Column({ default: 'unassigned' }) status: string;

  @OneToMany(() => StudentSection, ss => ss.section)
  studentSections: StudentSection[];
}
