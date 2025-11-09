import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity({ name: 'conflicts' })
export class Conflict {
  @PrimaryGeneratedColumn('uuid') id: string;

  @Column() type: string; // 'aula' | 'profesor' | 'alumno' | 'section' | 'offering'
  @Column({ nullable: true }) entity_id: string;
  @Column('text') description: string;
  @Column({ default: false }) resolved: boolean;
  @Column({ type: 'json', nullable: true }) extra_data: any;

  @CreateDateColumn() created_at: Date;
}
