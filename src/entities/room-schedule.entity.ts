  import { Entity, PrimaryGeneratedColumn, ManyToOne, Unique } from 'typeorm';
  import { Room } from './room.entity';
  import { Timeslot } from './timeslot.entity';
  import { Section } from './section.entity';
  import { Semester } from './semester.entity';

  @Entity({ name: 'room_schedule' })
  @Unique('uq_room_timeslot_semester', ['room', 'timeslot', 'semester'])
  export class RoomSchedule {
    @PrimaryGeneratedColumn('uuid') id: string;

    @ManyToOne(() => Room, r => r.schedules, { onDelete: 'CASCADE' })
    room: Room;

    @ManyToOne(() => Timeslot, ts => ts.roomSchedules, { onDelete: 'CASCADE' })
    timeslot: Timeslot;

    @ManyToOne(() => Section, sec => sec.studentSections, { onDelete: 'CASCADE' })
    section: Section;

    @ManyToOne(() => Semester, sem => sem.offerings, { onDelete: 'CASCADE' })
    semester: Semester;
  }
