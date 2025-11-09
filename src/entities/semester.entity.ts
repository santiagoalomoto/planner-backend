import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { CourseOffering } from './offering.entity';

@Entity({ name: 'semesters' })
export class Semester {
  @PrimaryGeneratedColumn('uuid') id: string;

  @Column() name: string;
  @Column('date') start_date: string;
  @Column('date') end_date: string;
  @Column({ default: 'draft' }) status: string;

  @CreateDateColumn() created_at: Date;

  @OneToMany(() => CourseOffering, offering => offering.semester)
  offerings: CourseOffering[];
}
