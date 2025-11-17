import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Conflict } from '../entities/conflict.entity';
import { Teacher } from '../entities/teacher.entity';
import { Student } from '../entities/student.entity';
import { CreateConflictDto } from './dto/create-conflict.dto';
import { UpdateConflictDto } from './dto/update-conflict.dto';

@Injectable()
export class ConflictsService {
  constructor(
    @InjectRepository(Conflict)
    private repo: Repository<Conflict>,
  ) {}

  // Crear conflicto
  create(dto: CreateConflictDto) {
    return this.repo.save(this.repo.create(dto));
  }

  // Listar conflictos con nombre de la entidad
  async findAll() {
    const conflicts = await this.repo.find();

    const result = await Promise.all(
      conflicts.map(async (c) => {
        let entity_name = '-';

        if (c.entity_id && c.entity_type) {
          if (c.entity_type === 'professor') {
            const teacher = await this.repo.manager.getRepository(Teacher).findOne({
              where: { id: c.entity_id },
            });
            entity_name = teacher ? teacher.name : '-';
          } else if (c.entity_type === 'student') {
            const student = await this.repo.manager.getRepository(Student).findOne({
              where: { id: c.entity_id },
            });
            entity_name = student ? student.name : '-';
          }
        }

        return { ...c, entity_name };
      }),
    );

    return result;
  }

  // Obtener conflicto por ID
  async findOne(id: string) {
    const conflict = await this.repo.findOne({ where: { id } });
    if (!conflict) throw new NotFoundException('Conflicto no encontrado');
    return conflict;
  }

  // Actualizar conflicto
  async update(id: string, dto: UpdateConflictDto) {
    const conflict = await this.findOne(id);
    Object.assign(conflict, dto);
    return this.repo.save(conflict);
  }

  // Eliminar conflicto
  async remove(id: string) {
    const conflict = await this.findOne(id);
    await this.repo.remove(conflict);
    return { deleted: true };
  }
}
