import { Injectable, NotFoundException } from '@nestjs/common';
import { Timeslot } from '../entities/timeslot.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTimeslotDto } from './dto/create-timeslot.dto';
import { UpdateTimeslotDto } from './dto/update-timeslot.dto';

@Injectable()
export class TimeslotsService {
  constructor(@InjectRepository(Timeslot) private repo: Repository<Timeslot>) {}

  create(dto: CreateTimeslotDto) { return this.repo.save(this.repo.create(dto)); }
  findAll() { return this.repo.find(); }
  async findOne(id: string) { const r = await this.repo.findOne({ where: { id } }); if(!r) throw new NotFoundException(); return r; }
  async update(id: string, dto: UpdateTimeslotDto) { const e = await this.findOne(id); Object.assign(e, dto); return this.repo.save(e); }
  async remove(id: string) { const e = await this.findOne(id); await this.repo.remove(e); return { deleted: true }; }
}
