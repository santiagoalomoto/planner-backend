import { Injectable, NotFoundException } from '@nestjs/common';
import { Conflict } from '../entities/conflict.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateConflictDto } from './dto/create-conflict.dto';
import { UpdateConflictDto } from './dto/update-conflict.dto';

@Injectable()
export class ConflictsService {
  constructor(@InjectRepository(Conflict) private repo: Repository<Conflict>) {}

  create(dto: CreateConflictDto) { return this.repo.save(this.repo.create(dto)); }
  findAll() { return this.repo.find(); }
  async findOne(id: string) { const r = await this.repo.findOne({ where:{id} }); if(!r) throw new NotFoundException(); return r; }
  async update(id: string, dto: UpdateConflictDto) { const e = await this.findOne(id); Object.assign(e, dto); return this.repo.save(e); }
  async remove(id: string) { const e = await this.findOne(id); await this.repo.remove(e); return { deleted: true }; }
}
