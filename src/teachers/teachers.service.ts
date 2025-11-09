import { Injectable, NotFoundException } from '@nestjs/common';
import { Teacher } from '../entities/teacher.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';

@Injectable()
export class TeachersService {
  constructor(@InjectRepository(Teacher) private repo: Repository<Teacher>) {}

  create(dto: CreateTeacherDto) { return this.repo.save(this.repo.create(dto)); }
  findAll() { return this.repo.find(); }
  async findOne(id: string) { const r = await this.repo.findOne({ where: { id } }); if(!r) throw new NotFoundException(); return r; }
  async update(id: string, dto: UpdateTeacherDto) { const e = await this.findOne(id); Object.assign(e, dto); return this.repo.save(e); }
  async remove(id: string) { const e = await this.findOne(id); await this.repo.remove(e); return { deleted: true }; }
}
