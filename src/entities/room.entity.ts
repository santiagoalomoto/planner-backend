import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { RoomSchedule } from './room-schedule.entity';
import { RoomUnavailability } from './room-unavailability.entity';
import { Section } from './section.entity';

@Entity({ name: 'rooms' })
export class Room {
  @PrimaryGeneratedColumn('uuid') id: string;

  @Column({ unique: true }) code: string;
  @Column() name: string;
  @Column('int') capacity: number;
  @Column({ default: 'aula' }) type: string;
  @Column({ type: 'json', nullable: true }) features: any;

  @CreateDateColumn() created_at: Date;

  @OneToMany(() => RoomSchedule, rs => rs.room)
  schedules: RoomSchedule[];

  @OneToMany(() => RoomUnavailability, ru => ru.room)
  unavailability: RoomUnavailability[];

  @OneToMany(() => Section, s => s.assigned_room)
  sections: Section[];
}
