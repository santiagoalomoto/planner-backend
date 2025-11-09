import { Injectable, NotFoundException } from '@nestjs/common';
import { CourseOffering } from '../entities/offering.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOfferingDto } from './dto/create-offering.dto';
import { UpdateOfferingDto } from './dto/update-offering.dto';

@Injectable()
export class OfferingsService {
  constructor(@InjectRepository(CourseOffering) private repo: Repository<CourseOffering>) {}

  create(dto: CreateOfferingDto) {
    const ent = this.repo.create({
      course: { id: dto.courseId } as any,
      semester: { id: dto.semesterId } as any,
      teacher: dto.teacherId ? ({ id: dto.teacherId } as any) : null,
      expected_students: dto.expected_students || 0,
    });
    return this.repo.save(ent);
  }

  findAll() { return this.repo.find({ relations: ['course','semester','teacher'] }); }
  async findOne(id: string) { const r = await this.repo.findOne({ where: { id }, relations: ['course','semester'] }); if(!r) throw new NotFoundException(); return r; }
  async update(id: string, dto: UpdateOfferingDto) { const e = await this.findOne(id); if(dto.teacherId) (e as any).teacher = { id: dto.teacherId } as any; if(dto.expected_students!==undefined) e.expected_students = dto.expected_students; return this.repo.save(e); }
  async remove(id: string) { const e = await this.findOne(id); await this.repo.remove(e); return { deleted: true }; }
}
