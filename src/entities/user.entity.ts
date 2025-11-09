import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

export type UserRole = 'admin' | 'coordinator' | 'teacher' | 'student';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid') id: string;

  @Column({ unique: true }) username: string;
  @Column() password: string;
  @Column({ type: 'varchar', default: 'student' }) role: UserRole;
  @Column({ nullable: true }) related_id: string; // student.id or teacher.id
  @CreateDateColumn() created_at: Date;
}
