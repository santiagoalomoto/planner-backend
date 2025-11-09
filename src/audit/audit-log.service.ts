import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuditLog } from '../entities/audit-log.entity';
import { CreateAuditLogDto } from './dto/create-audit-log.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class AuditLogService {
  constructor(
    @InjectRepository(AuditLog)
    private readonly auditLogRepository: Repository<AuditLog>,
  ) {}

  async create(createAuditLogDto: CreateAuditLogDto): Promise<AuditLog> {
    const log = this.auditLogRepository.create(createAuditLogDto);
    return this.auditLogRepository.save(log);
  }

  async findAll(): Promise<AuditLog[]> {
    return this.auditLogRepository.find({
      relations: ['user'],
      order: { created_at: 'DESC' },
    });
  }

  async findByUser(user_id: string): Promise<AuditLog[]> {
    // Soporta búsquedas por id de relación (user.id) o por user_id directo
    // en caso tu tabla tenga user_id como string simple.
    return this.auditLogRepository.find({
      where: [
        { user: { id: user_id } as any }, // cuando existe la relación
        { user_id }, // fallback si se guardó solo user_id
      ],
      relations: ['user'],
      order: { created_at: 'DESC' },
    });
  }

  /**
   * Buscar por tipo de entidad de forma robusta:
   * - ignora mayúsculas/minúsculas
   * - ignora espacios al principio/final
   * Esto evita que 'Course', ' course ', 'COURSE' fallen.
   */
  async findByEntity(entity_type: string): Promise<AuditLog[]> {
    if (!entity_type) return [];

    // normalizamos el término buscado
    const normalized = entity_type.trim().toLowerCase();

    const qb = this.auditLogRepository
      .createQueryBuilder('audit')
      .leftJoinAndSelect('audit.user', 'user')
      .where('LOWER(TRIM(audit.entity_type)) = :normalized', { normalized })
      .orderBy('audit.created_at', 'DESC');

    return qb.getMany();
  }

  async clearAll(): Promise<void> {
    await this.auditLogRepository.clear();
  }
}
