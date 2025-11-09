// src/enrollments/enrollments.service.ts
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Enrollment } from '../entities/enrollment.entity';
import { Section } from '../entities/section.entity';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { UpdateEnrollmentDto } from './dto/update-enrollment.dto';

@Injectable()
export class EnrollmentsService {
  constructor(
    @InjectRepository(Enrollment)
    private readonly repo: Repository<Enrollment>,

    @InjectRepository(Section)
    private readonly sectionRepo: Repository<Section>,
  ) {}

  // 🔹 Crear inscripción
  async create(dto: CreateEnrollmentDto): Promise<Enrollment> {
    // Buscar la sección con relaciones necesarias
    const section = await this.sectionRepo.findOne({
      where: { id: dto.sectionId },
      relations: ['assigned_room', 'assigned_timeslot', 'offering'],
    });

    if (!section) {
      throw new NotFoundException('Sección no encontrada');
    }

    // Validar capacidad disponible
    const maxCapacity = section.assigned_room?.capacity ?? section.capacity ?? 0;
    if (maxCapacity <= 0) {
      throw new BadRequestException(
        'La sección no tiene aula asignada ni capacidad definida',
      );
    }

    // Validar que la sección pertenece a la oferta enviada
    if (section.offering.id !== dto.offeringId) {
      throw new BadRequestException('La sección no pertenece a la oferta seleccionada');
    }

    // Contar estudiantes ya inscritos
    const currentCount = await this.repo.count({
      where: { section: { id: dto.sectionId } },
    });
    if (currentCount >= maxCapacity) {
      throw new BadRequestException(
        `La sección alcanzó el límite de capacidad (${maxCapacity} estudiantes)`,
      );
    }

    // Verificar si el estudiante ya está inscrito en esta sección
    const exists = await this.repo.findOne({
      where: {
        student: { id: dto.studentId },
        section: { id: dto.sectionId },
      },
    });
    if (exists) {
      throw new BadRequestException('El estudiante ya está inscrito en esta sección');
    }

    // Verificar conflicto de horario
    const existingEnrollments = await this.repo.find({
      where: { student: { id: dto.studentId } },
      relations: ['section', 'section.assigned_timeslot'],
    });
    const conflict = existingEnrollments.some(
      (e) =>
        e.section?.assigned_timeslot?.id &&
        e.section.assigned_timeslot.id === section.assigned_timeslot?.id,
    );
    if (conflict) {
      throw new BadRequestException(
        'El estudiante ya tiene una asignatura en este mismo horario',
      );
    }

    // Crear inscripción
    const enrollment = this.repo.create({
      student: { id: dto.studentId },
      offering: section.offering, // usar la oferta de la sección
      section: section,
    });

    return await this.repo.save(enrollment);
  }

  // 🔹 Obtener todas las inscripciones
  async findAll(): Promise<Enrollment[]> {
    return await this.repo.find({
      relations: ['student', 'offering', 'section'],
    });
  }

  // 🔹 Obtener una inscripción específica
  async findOne(id: string): Promise<Enrollment> {
    const enrollment = await this.repo.findOne({
      where: { id },
      relations: ['student', 'offering', 'section'],
    });

    if (!enrollment) {
      throw new NotFoundException('Inscripción no encontrada');
    }

    return enrollment;
  }

  // 🔹 Actualizar inscripción
  async update(id: string, dto: UpdateEnrollmentDto): Promise<Enrollment> {
    const enrollment = await this.findOne(id);

    if (dto.studentId) (enrollment as any).student = { id: dto.studentId } as any;
    if (dto.offeringId) (enrollment as any).offering = { id: dto.offeringId } as any;
    if (dto.sectionId) (enrollment as any).section = { id: dto.sectionId } as any;

    return await this.repo.save(enrollment);
  }

  // 🔹 Eliminar inscripción
  async remove(id: string) {
    const enrollment = await this.findOne(id);
    await this.repo.remove(enrollment);
    return { deleted: true };
  }
}
