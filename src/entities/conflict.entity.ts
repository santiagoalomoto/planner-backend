import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity({ name: 'conflicts' })
export class Conflict {
  @PrimaryGeneratedColumn('uuid') id: string;

  @Column() type: string; // Tipo de conflicto libre (ej: aula ocupada, horario, etc.)
  
  @Column({ nullable: true }) entity_id: string; // Id del profesor o estudiante asociado
  @Column({ nullable: true }) entity_type: 'professor' | 'student'; // Tipo de entidad asociada

  @Column('text') description: string;
  @Column({ default: false }) resolved: boolean;
  @Column({ type: 'json', nullable: true }) extra_data: any;

  @CreateDateColumn() created_at: Date;
}
