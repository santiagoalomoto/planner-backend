import { Injectable, NotFoundException } from '@nestjs/common';
import { Student } from '../entities/student.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Injectable()
export class StudentsService {
  constructor(@InjectRepository(Student) private repo: Repository<Student>) {}

  async create(dto: CreateStudentDto) {
    const student = this.repo.create(dto);
    await this.repo.save(student);
    return this.repo.findOne({ where: { id: student.id } });
  }

  findAll() {
    return this.repo.find();
  }

  async findOne(id: string) {
    const r = await this.repo.findOne({ where: { id } });
    if (!r) throw new NotFoundException();
    return r;
  }

  async update(id: string, dto: UpdateStudentDto) {
    const student = await this.findOne(id);
    Object.assign(student, dto);
    await this.repo.save(student);
    return this.repo.findOne({ where: { id: student.id } });
  }

  async remove(id: string) {
    const student = await this.findOne(id);
    await this.repo.remove(student);
    return { deleted: true };
  }
}
