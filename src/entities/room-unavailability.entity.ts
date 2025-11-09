import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Room } from './room.entity';
import { Timeslot } from './timeslot.entity';

@Entity({ name: 'room_unavailability' })
export class RoomUnavailability {
  @PrimaryGeneratedColumn('uuid') id: string;

  @ManyToOne(() => Room, room => room.unavailability, { onDelete: 'CASCADE' })
  room: Room;

  @ManyToOne(() => Timeslot, ts => ts.roomSchedules, { onDelete: 'CASCADE' })
  timeslot: Timeslot;

  @Column({ nullable: true }) reason: string;
  @Column({ type: 'date', nullable: true }) date_start: string;
  @Column({ type: 'date', nullable: true }) date_end: string;
}
