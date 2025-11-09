import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StudentSection } from '../entities/student-section.entity';
import { Repository } from 'typeorm';
import { CreateStudentSectionDto } from './dto/create-student-section.dto';
import { UpdateStudentSectionDto } from './dto/update-student-section.dto';
import { Student } from '../entities/student.entity';
import { Section } from '../entities/section.entity';

@Injectable()
export class StudentSectionService {
  constructor(
    @InjectRepository(StudentSection) private repo: Repository<StudentSection>,
    @InjectRepository(Student) private studentRepo: Repository<Student>,
    @InjectRepository(Section) private sectionRepo: Repository<Section>,
  ) {}

  async create(dto: CreateStudentSectionDto) {
    const student = await this.studentRepo.findOne({ where: { id: dto.studentId } });
    if (!student) throw new NotFoundException('Student not found');
    const section = await this.sectionRepo.findOne({ where: { id: dto.sectionId }, relations: ['studentSections'] });
    if (!section) throw new NotFoundException('Section not found');

    // chequeo de cupo
    const currentCount = section.studentSections ? section.studentSections.length : 0;
    if (currentCount >= section.capacity) throw new BadRequestException('Section is full');

    const ent = this.repo.create({
      student: { id: dto.studentId } as any,
      section: { id: dto.sectionId } as any,
    } as any);
    return this.repo.save(ent);
  }

  findAll() {
    return this.repo.find({ relations: ['student', 'section'] });
  }

  async findOne(id: string) {
    const r = await this.repo.findOne({ where: { id }, relations: ['student', 'section'] });
    if (!r) throw new NotFoundException('StudentSection not found');
    return r;
  }

  async update(id: string, dto: UpdateStudentSectionDto) {
    const e = await this.findOne(id);
    if (dto.studentId) (e as any).student = { id: dto.studentId } as any;
    if (dto.sectionId) (e as any).section = { id: dto.sectionId } as any;
    return this.repo.save(e);
  }

  async remove(id: string) {
    const e = await this.findOne(id);
    await this.repo.remove(e);
    return { deleted: true };
  }
}
