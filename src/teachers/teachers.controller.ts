import { Controller, Post, Body, Get, Param, Patch, Delete, UseGuards } from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('teachers')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class TeachersController {
  constructor(private svc: TeachersService) {}
  @Post() @Roles('admin') create(@Body() dto: CreateTeacherDto){ return this.svc.create(dto); }
  @Get() @Roles('admin','coordinator') findAll(){ return this.svc.findAll(); }
  @Get(':id') @Roles('admin','coordinator','teacher') findOne(@Param('id') id:string){ return this.svc.findOne(id); }
  @Patch(':id') @Roles('admin') update(@Param('id') id:string, @Body() dto: UpdateTeacherDto){ return this.svc.update(id,dto); }
  @Delete(':id') @Roles('admin') remove(@Param('id') id:string){ return this.svc.remove(id); }
}
