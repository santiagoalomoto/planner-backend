import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Curriculum } from '../entities/curriculum.entity';
import { Course } from '../entities/course.entity';
import { CreateCurriculumDto } from './dto/create-curriculum.dto';
import { UpdateCurriculumDto } from './dto/update-curriculum.dto';

@Injectable()
export class CurriculumsService {
  constructor(
    @InjectRepository(Curriculum)
    private curriculumRepo: Repository<Curriculum>,
    @InjectRepository(Course)
    private courseRepo: Repository<Course>,
  ) {}

  async create(dto: CreateCurriculumDto) {
    const curriculum = this.curriculumRepo.create(dto);

    if (dto.courseIds && dto.courseIds.length > 0) {
      curriculum.courses = await this.courseRepo.findBy({
        id: In(dto.courseIds),
      });
    }

    return this.curriculumRepo.save(curriculum);
  }

  findAll() {
    return this.curriculumRepo.find({ relations: ['courses', 'students'] });
  }

  async findOne(id: number) {
    const curriculum = await this.curriculumRepo.findOne({
      where: { id },
      relations: ['courses', 'students'],
    });
    if (!curriculum) throw new NotFoundException(`Curriculum #${id} not found`);
    return curriculum;
  }

  async update(id: number, dto: UpdateCurriculumDto) {
    const curriculum = await this.findOne(id);

    Object.assign(curriculum, dto);

    if (dto.courseIds !== undefined) {
      if (dto.courseIds.length > 0) {
        curriculum.courses = await this.courseRepo.findBy({
          id: In(dto.courseIds),
        });
      } else {
        curriculum.courses = [];
      }
    }

    return this.curriculumRepo.save(curriculum);
  }

  async remove(id: number) {
    const curriculum = await this.findOne(id);
    await this.curriculumRepo.remove(curriculum);
    return { message: 'Curriculum deleted successfully' };
  }
}
