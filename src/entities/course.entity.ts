    import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { CourseOffering } from './offering.entity';

@Entity({ name: 'courses' })
export class Course {
  @PrimaryGeneratedColumn('uuid') id: string;

  @Column({ unique: true }) code: string;
  @Column() name: string;
  @Column({ nullable: true }) career: string;
  @Column('int', { nullable: true }) credit_hours: number;
  @Column({ nullable: true }) requires_room_type: string;
  @Column('int', { nullable: true }) preferred_section_size: number;

  @OneToMany(() => CourseOffering, o => o.course)
  offerings: CourseOffering[];
}
