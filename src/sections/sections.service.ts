import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Section } from '../entities/section.entity';
import { Teacher } from '../entities/teacher.entity';
import { Timeslot } from '../entities/timeslot.entity';
import { Room } from '../entities/room.entity';
import { CreateSectionDto } from './dto/create-section.dto';
import { UpdateSectionDto } from './dto/update-section.dto';

@Injectable()
export class SectionsService {
  constructor(
    @InjectRepository(Section) private repo: Repository<Section>,
    @InjectRepository(Teacher) private teacherRepo: Repository<Teacher>,
    @InjectRepository(Timeslot) private timeslotRepo: Repository<Timeslot>,
    @InjectRepository(Room) private roomRepo: Repository<Room>,
  ) {}

  async create(dto: CreateSectionDto) {
    // Validar duplicado
    const existing = await this.repo.findOne({
      where: { code: dto.code, offering: { id: dto.offeringId } as any },
      relations: ['offering'],
    });
    if (existing) throw new BadRequestException(`Ya existe una sección con código "${dto.code}"`);

    // Crear sección
    const ent = this.repo.create({
      offering: { id: dto.offeringId } as any,
      code: dto.code,
      capacity: dto.capacity,
      assigned_room: dto.assignedRoomId ? ({ id: dto.assignedRoomId } as any) : null,
      teacher: dto.teacherId ? ({ id: dto.teacherId } as any) : null,
      assigned_timeslot: dto.assignedTimeslotId ? ({ id: dto.assignedTimeslotId } as any) : null,
      semester: dto.semesterId ? ({ id: dto.semesterId } as any) : null,
    } as any);

    return this.repo.save(ent);
  }

  findAll() {
    return this.repo
      .find({ relations: ['offering', 'assigned_room', 'assigned_timeslot', 'teacher', 'semester'] })
      .then((list) => list.map((s) => this._enrichSection(s)));
  }

  async findOne(id: string) {
    const section = await this.repo.findOne({
      where: { id },
      relations: ['offering', 'assigned_room', 'assigned_timeslot', 'teacher', 'semester'],
    });
    if (!section) throw new NotFoundException('Sección no encontrada.');
    return this._enrichSection(section);
  }

  private _enrichSection(section: Section) {
    if (!section) return section;
    // Crear una propiedad `name` que el frontend espera. Preferir code, luego id.
    (section as any).name = section['name'] || section.code || section.id;
    return section;
  }

  async update(id: string, dto: UpdateSectionDto) {
    const section = await this.findOne(id);

    if (dto.code || dto.offeringId) {
      const duplicate = await this.repo.findOne({
        where: {
          code: dto.code ?? section.code,
          offering: { id: dto.offeringId ?? section.offering.id } as any,
        },
      });
      if (duplicate && duplicate.id !== id) throw new BadRequestException('Código duplicado.');
    }

    if (dto.offeringId) section.offering = { id: dto.offeringId } as any;
    if (dto.assignedRoomId) section.assigned_room = { id: dto.assignedRoomId } as any;
    if (dto.assignedTimeslotId) section.assigned_timeslot = { id: dto.assignedTimeslotId } as any;
    if (dto.teacherId) section.teacher = { id: dto.teacherId } as any;
    if (dto.semesterId) section.semester = { id: dto.semesterId } as any;

    Object.assign(section, dto);
    return this.repo.save(section);
  }

  async remove(id: string) {
    const section = await this.findOne(id);
    await this.repo.remove(section);
    return { deleted: true };
  }
}
