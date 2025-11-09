import { Controller, Post, Body, Get, Param, Patch, Delete, UseGuards } from '@nestjs/common';
import { StudentSectionService } from './student-section.service';
import { CreateStudentSectionDto } from './dto/create-student-section.dto';
import { UpdateStudentSectionDto } from './dto/update-student-section.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('student-sections')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class StudentSectionController {
  constructor(private svc: StudentSectionService) {}

  @Post() @Roles('admin','coordinator') create(@Body() dto: CreateStudentSectionDto) { return this.svc.create(dto); }

  @Get() @Roles('admin','coordinator') findAll() { return this.svc.findAll(); }

  @Get(':id') @Roles('admin','coordinator','teacher','student') findOne(@Param('id') id: string) { return this.svc.findOne(id); }

  @Patch(':id') @Roles('admin','coordinator') update(@Param('id') id: string, @Body() dto: UpdateStudentSectionDto) { return this.svc.update(id,dto); }

  @Delete(':id') @Roles('admin') remove(@Param('id') id: string) { return this.svc.remove(id); }
}
