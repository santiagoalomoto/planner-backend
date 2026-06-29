import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { Course } from './course.entity';
import { Student } from './student.entity';

@Entity('curriculums')
export class Curriculum {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string; // Ej: "Ingeniería de Sistemas 2024"

  @Column({ length: 20, unique: true })
  code: string; // Ej: "IS-2024"

  @Column({ length: 100, nullable: true })
  program: string; // Carrera/Programa

  @Column({ nullable: true })
  year: number; // Año de vigencia

  @Column({ type: 'text', nullable: true })
  description: string;

  @ManyToMany(() => Course, { eager: true })
  @JoinTable({
    name: 'curriculum_courses',
    joinColumn: { name: 'curriculum_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'course_id', referencedColumnName: 'id' },
  })
  courses: Course[];

  @OneToMany(() => Student, (student) => student.curriculum)
  students: Student[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
