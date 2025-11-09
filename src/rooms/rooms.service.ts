import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from '../entities/room.entity';
import { Repository } from 'typeorm';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';

@Injectable()
export class RoomsService {
  constructor(@InjectRepository(Room) private repo: Repository<Room>) {}

  create(dto: CreateRoomDto) { return this.repo.save(this.repo.create(dto)); }
  findAll() { return this.repo.find(); }
  async findOne(id: string) { const r = await this.repo.findOne({ where: { id } }); if (!r) throw new NotFoundException(); return r; }
  async update(id: string, dto: UpdateRoomDto) { const e = await this.findOne(id); Object.assign(e, dto); return this.repo.save(e); }
  async remove(id: string) { const e = await this.findOne(id); await this.repo.remove(e); return { deleted: true }; }
}
