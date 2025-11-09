import { Controller, Post, Body, Get, Param, Patch, Delete, UseGuards } from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('students')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class StudentsController {
  constructor(private svc: StudentsService) {}

  @Post()
  @Roles('admin','coordinator')
  create(@Body() dto: CreateStudentDto) {
    return this.svc.create(dto);
  }

  @Get()
  @Roles('admin','coordinator')
  findAll() {
    return this.svc.findAll();
  }

  @Get(':id')
  @Roles('admin','coordinator','student')
  findOne(@Param('id') id:string) {
    return this.svc.findOne(id);
  }

  @Patch(':id')
  @Roles('admin','coordinator')
  update(@Param('id') id:string, @Body() dto: UpdateStudentDto) {
    return this.svc.update(id,dto);
  }

  @Delete(':id')
  @Roles('admin')
  remove(@Param('id') id:string) {
    return this.svc.remove(id);
  }
}
