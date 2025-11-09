import { Controller, Post, Body, Get, Param, Patch, Delete, UseGuards } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('courses')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class CoursesController {
  constructor(private svc: CoursesService) {}
  @Post() @Roles('admin','coordinator') create(@Body() dto: CreateCourseDto){ return this.svc.create(dto); }
  @Get() @Roles('admin','coordinator') findAll(){ return this.svc.findAll(); }
  @Get(':id') @Roles('admin','coordinator') findOne(@Param('id') id:string){ return this.svc.findOne(id); }
  @Patch(':id') @Roles('admin','coordinator') update(@Param('id') id:string, @Body() dto: UpdateCourseDto){ return this.svc.update(id,dto); }
  @Delete(':id') @Roles('admin') remove(@Param('id') id:string){ return this.svc.remove(id); }
}
