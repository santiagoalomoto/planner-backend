import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from '../entities/course.entity';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { AuditLogService } from '../audit/audit-log.service';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private readonly repo: Repository<Course>,
    private readonly auditLogService: AuditLogService,
  ) {}

  async create(dto: CreateCourseDto) {
    const created = await this.repo.save(this.repo.create(dto));

    await this.auditLogService.create({
      user_id: undefined, // ✅ sin error de tipo
      action: 'CREATE',
      entity_type: 'course',
      entity_id: created.id,
      payload: created,
    });

    return created;
  }

  findAll() {
    return this.repo.find();
  }

  async findOne(id: string) {
    const course = await this.repo.findOne({ where: { id } });
    if (!course) throw new NotFoundException();
    return course;
  }

  async update(id: string, dto: UpdateCourseDto) {
    const existing = await this.findOne(id);
    Object.assign(existing, dto);
    const updated = await this.repo.save(existing);

    await this.auditLogService.create({
      user_id: undefined, // ✅ igual aquí
      action: 'UPDATE',
      entity_type: 'course',
      entity_id: id,
      payload: dto,
    });

    return updated;
  }

  async remove(id: string) {
    const existing = await this.findOne(id);
    await this.repo.remove(existing);

    await this.auditLogService.create({
      user_id: undefined, // ✅ y aquí también
      action: 'DELETE',
      entity_type: 'course',
      entity_id: id,
      payload: existing,
    });

    return { deleted: true };
  }
}
