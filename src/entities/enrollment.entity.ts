import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Student } from './student.entity';
import { CourseOffering } from './offering.entity';
import { Section } from './section.entity';

@Entity({ name: 'enrollments' })
export class Enrollment {
  @PrimaryGeneratedColumn('uuid') id: string;

  @ManyToOne(() => Student, s => s.enrollments, { onDelete: 'CASCADE' })
  student: Student;

  @ManyToOne(() => CourseOffering, o => o.sections, { onDelete: 'CASCADE' })
  offering: CourseOffering;

  @Column({ default: 'pending' }) status: string;

  @ManyToOne(() => Section, s => s.studentSections, { onDelete: 'CASCADE' })
  section: Section;
}