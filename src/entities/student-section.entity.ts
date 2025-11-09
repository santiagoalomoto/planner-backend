import { Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import { Student } from './student.entity';
import { Section } from './section.entity';

@Entity({ name: 'student_section' })
export class StudentSection {
  @PrimaryGeneratedColumn('uuid') id: string;

  @ManyToOne(() => Student, s => s.studentSections, { onDelete: 'CASCADE' })
  student: Student;

  @ManyToOne(() => Section, sec => sec.studentSections, { onDelete: 'CASCADE' })
  section: Section;

  @CreateDateColumn() assigned_at: Date;
}
