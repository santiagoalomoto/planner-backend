import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { RoomSchedule } from '../entities/room-schedule.entity';
import { TeacherSchedule } from '../entities/teacher-schedule.entity';
import { Room } from '../entities/room.entity';
import { Timeslot } from '../entities/timeslot.entity';
import { Section } from '../entities/section.entity';
import { Semester } from '../entities/semester.entity';
import { Teacher } from '../entities/teacher.entity';

import { CreateRoomScheduleDto } from './dto/create-room-schedule.dto';
import { UpdateRoomScheduleDto } from './dto/update-room-schedule.dto';
import { CreateTeacherScheduleDto } from './dto/create-teacher-schedule.dto';
import { UpdateTeacherScheduleDto } from './dto/update-teacher-schedule.dto';

@Injectable()
export class SchedulesService {
  constructor(
    @InjectRepository(RoomSchedule)
    private roomRepo: Repository<RoomSchedule>,
    @InjectRepository(TeacherSchedule)
    private teacherScheduleRepo: Repository<TeacherSchedule>,
    @InjectRepository(Room)
    private rRepo: Repository<Room>,
    @InjectRepository(Timeslot)
    private tRepo: Repository<Timeslot>,
    @InjectRepository(Section)
    private sRepo: Repository<Section>,
    @InjectRepository(Semester)
    private semRepo: Repository<Semester>,
    @InjectRepository(Teacher)
    private teacherRepo: Repository<Teacher>,
  ) {}

  // ==========================================================
  // ✅ ROOM SCHEDULE CRUD (con validación de disponibilidad)
  // ==========================================================
  async createRoomSchedule(dto: CreateRoomScheduleDto) {
    const [room, timeslot, section, semester] = await Promise.all([
      this.rRepo.findOne({ where: { id: dto.roomId } }),
      this.tRepo.findOne({ where: { id: dto.timeslotId } }),
      this.sRepo.findOne({ where: { id: dto.sectionId } }),
      this.semRepo.findOne({ where: { id: dto.semesterId } }),
    ]);

    if (!room) throw new NotFoundException('Room not found');
    if (!timeslot) throw new NotFoundException('Timeslot not found');
    if (!section) throw new NotFoundException('Section not found');
    if (!semester) throw new NotFoundException('Semester not found');

    // ✅ Validar si el aula ya está ocupada en ese horario y semestre
    const roomConflict = await this.roomRepo.findOne({
      where: {
        room: { id: dto.roomId } as any,
        timeslot: { id: dto.timeslotId } as any,
        semester: { id: dto.semesterId } as any,
      },
    });

    if (roomConflict) {
      throw new BadRequestException(
        'El aula seleccionada ya está ocupada en este horario.',
      );
    }

    const ent = this.roomRepo.create({
      room: { id: dto.roomId } as any,
      timeslot: { id: dto.timeslotId } as any,
      section: { id: dto.sectionId } as any,
      semester: { id: dto.semesterId } as any,
    } as any);

    return this.roomRepo.save(ent);
  }

  findAllRoomSchedules() {
    return this.roomRepo.find({
      relations: ['room', 'timeslot', 'section', 'semester'],
    });
  }

  async findRoomSchedule(id: string) {
    const r = await this.roomRepo.findOne({
      where: { id },
      relations: ['room', 'timeslot', 'section', 'semester'],
    });
    if (!r) throw new NotFoundException('Room schedule not found');
    return r;
  }

  async updateRoomSchedule(id: string, dto: UpdateRoomScheduleDto) {
    const e = await this.findRoomSchedule(id);
    if (dto.roomId) (e as any).room = { id: dto.roomId } as any;
    if (dto.timeslotId) (e as any).timeslot = { id: dto.timeslotId } as any;
    if (dto.sectionId) (e as any).section = { id: dto.sectionId } as any;
    if (dto.semesterId) (e as any).semester = { id: dto.semesterId } as any;
    return this.roomRepo.save(e);
  }

  async removeRoomSchedule(id: string) {
    const e = await this.findRoomSchedule(id);
    await this.roomRepo.remove(e);
    return { deleted: true };
  }

  // ==========================================================
  // ✅ TEACHER SCHEDULE CRUD (con validación de disponibilidad)
  // ==========================================================
  async createTeacherSchedule(dto: CreateTeacherScheduleDto) {
    const [teacher, timeslot, section, semester] = await Promise.all([
      this.teacherRepo.findOne({ where: { id: dto.teacherId } }),
      this.tRepo.findOne({ where: { id: dto.timeslotId } }),
      this.sRepo.findOne({ where: { id: dto.sectionId } }),
      this.semRepo.findOne({ where: { id: dto.semesterId } }),
    ]);

    if (!teacher) throw new NotFoundException('Teacher not found');
    if (!timeslot) throw new NotFoundException('Timeslot not found');
    if (!section) throw new NotFoundException('Section not found');
    if (!semester) throw new NotFoundException('Semester not found');

    // ✅ Validar conflicto de horario del docente
    const teacherConflict = await this.teacherScheduleRepo.findOne({
      where: {
        teacher: { id: dto.teacherId } as any,
        timeslot: { id: dto.timeslotId } as any,
        semester: { id: dto.semesterId } as any,
      },
    });

    if (teacherConflict) {
      throw new BadRequestException(
        'El docente ya tiene asignada otra clase en este horario.',
      );
    }

    const ent = this.teacherScheduleRepo.create({
      teacher: { id: dto.teacherId } as any,
      timeslot: { id: dto.timeslotId } as any,
      section: { id: dto.sectionId } as any,
      semester: { id: dto.semesterId } as any,
    } as any);

    return this.teacherScheduleRepo.save(ent);
  }

  async findAllTeacherSchedules() {
    return this.teacherScheduleRepo.find({
      relations: ['teacher', 'timeslot', 'section', 'semester'],
    });
  }

  async findTeacherSchedule(id: string) {
    const r = await this.teacherScheduleRepo.findOne({
      where: { id },
      relations: ['teacher', 'timeslot', 'section', 'semester'],
    });
    if (!r) throw new NotFoundException('Teacher schedule not found');
    return r;
  }

  async updateTeacherSchedule(id: string, dto: UpdateTeacherScheduleDto) {
    const e = await this.findTeacherSchedule(id);
    if (dto.teacherId) (e as any).teacher = { id: dto.teacherId } as any;
    if (dto.timeslotId) (e as any).timeslot = { id: dto.timeslotId } as any;
    if (dto.sectionId) (e as any).section = { id: dto.sectionId } as any;
    if (dto.semesterId) (e as any).semester = { id: dto.semesterId } as any;
    return this.teacherScheduleRepo.save(e);
  }

  async removeTeacherSchedule(id: string) {
    const e = await this.findTeacherSchedule(id);
    await this.teacherScheduleRepo.remove(e);
    return { deleted: true };
  }
}
