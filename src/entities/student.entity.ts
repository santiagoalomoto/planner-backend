import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { Enrollment } from './enrollment.entity';
import { StudentSection } from './student-section.entity';
import { Course } from './course.entity';
import { Semester } from './semester.entity';

@Entity({ name: 'students' })
export class Student {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, nullable: true })
  student_number: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  email: string; // agregado

  @Column({ nullable: true })
  career: string;

  @Column('int', { nullable: true })
  semester_academic: number;

  // Relación con Curso
  @ManyToOne(() => Course, { eager: true, nullable: true })
  @JoinColumn({ name: 'courseId' })
  course: Course;

  @Column({ nullable: true })
  courseId: string;

  // Relación con Semestre
  @ManyToOne(() => Semester, { eager: true, nullable: true })
  @JoinColumn({ name: 'semesterId' })
  semester: Semester;

  @Column({ nullable: true })
  semesterId: string;

  // Relaciones con enrollments y studentSections
  @OneToMany(() => Enrollment, e => e.student)
  enrollments: Enrollment[];

  @OneToMany(() => StudentSection, ss => ss.student)
  studentSections: StudentSection[];
}
