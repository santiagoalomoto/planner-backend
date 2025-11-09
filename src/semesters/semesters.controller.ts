import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards } from '@nestjs/common';
import { SemestersService } from './semesters.service';
import { CreateSemesterDto } from './dto/create-semester.dto';
import { UpdateSemesterDto } from './dto/update-semester.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('semesters')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class SemestersController {
  constructor(private svc: SemestersService) {}

  @Post() @Roles('admin') create(@Body() dto: CreateSemesterDto) { return this.svc.create(dto); }

  @Get() @Roles('admin','coordinator') findAll() { return this.svc.findAll(); }

  @Get(':id') @Roles('admin','coordinator') findOne(@Param('id') id: string) { return this.svc.findOne(id); }

  @Patch(':id') @Roles('admin') update(@Param('id') id: string, @Body() dto: UpdateSemesterDto) { return this.svc.update(id, dto); }

  @Delete(':id') @Roles('admin') remove(@Param('id') id: string) { return this.svc.remove(id); }
}
