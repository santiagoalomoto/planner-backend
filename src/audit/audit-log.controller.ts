import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { AuditLogService } from './audit-log.service';
import { CreateAuditLogDto } from './dto/create-audit-log.dto';
import { AuditLog } from '../entities/audit-log.entity';

@Controller('audit-logs')
export class AuditLogController {
  constructor(private readonly auditLogService: AuditLogService) {}

  // Crear registro de auditoría
  @Post()
  create(@Body() createAuditLogDto: CreateAuditLogDto): Promise<AuditLog> {
    return this.auditLogService.create(createAuditLogDto);
  }

  // Obtener todos los registros
  @Get()
  findAll(): Promise<AuditLog[]> {
    return this.auditLogService.findAll();
  }

  // Filtrar por usuario
  @Get('user/:user_id')
  findByUser(@Param('user_id') user_id: string): Promise<AuditLog[]> {
    return this.auditLogService.findByUser(user_id);
  }

  // Filtrar por entidad
  @Get('entity/:entity_type')
  findByEntity(@Param('entity_type') entity_type: string): Promise<AuditLog[]> {
    return this.auditLogService.findByEntity(entity_type);
  }

  // Borrar todos los registros
  @Delete('clear')
  clearAll(): Promise<void> {
    return this.auditLogService.clearAll();
  }
}
