import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Course } from './course.entity';
import { Semester } from './semester.entity';
import { Teacher } from './teacher.entity';
import { Section } from './section.entity';

@Entity({ name: 'course_offerings' })
export class CourseOffering {
  @PrimaryGeneratedColumn('uuid') id: string;

  @ManyToOne(() => Course, c => c.offerings, { eager: true, onDelete: 'CASCADE' })
  course: Course;

  @ManyToOne(() => Semester, s => s.offerings, { onDelete: 'CASCADE' })
  semester: Semester;

  @ManyToOne(() => Teacher, t => t.offerings, { nullable: true })
  teacher: Teacher;

  @Column('int', { default: 0 }) expected_students: number;
  @Column({ default: 'draft' }) status: string;

  @OneToMany(() => Section, sec => sec.offering)
  sections: Section[];
}
