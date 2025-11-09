import { Controller, Post, Body, Get, Param, Patch, Delete, UseGuards } from '@nestjs/common';
import { ConflictsService } from './conflicts.service'
import { CreateConflictDto } from './dto/create-conflict.dto';
import { UpdateConflictDto } from './dto/update-conflict.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('conflicts')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class ConflictsController {
  constructor(private svc: ConflictsService) {}
  @Post() @Roles('admin','coordinator') create(@Body() dto: CreateConflictDto){ return this.svc.create(dto); }
  @Get() @Roles('admin','coordinator') findAll(){ return this.svc.findAll(); }
  @Get(':id') @Roles('admin','coordinator') findOne(@Param('id') id:string){ return this.svc.findOne(id); }
  @Patch(':id') @Roles('admin','coordinator') update(@Param('id') id:string, @Body() dto: UpdateConflictDto){ return this.svc.update(id,dto); }
  @Delete(':id') @Roles('admin') remove(@Param('id') id:string){ return this.svc.remove(id); }
}
