import { Controller, Post, Body, Get, Param, Patch, Delete, UseGuards } from '@nestjs/common';
import { EnrollmentsService } from './enrollments.service';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { UpdateEnrollmentDto } from './dto/update-enrollment.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('enrollments')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class EnrollmentsController {
  constructor(private readonly svc: EnrollmentsService) {}

  @Post()
  @Roles('admin', 'coordinator')
  create(@Body() dto: CreateEnrollmentDto) {
    return this.svc.create(dto);
  }

  @Get()
  @Roles('admin', 'coordinator')
  findAll() {
    return this.svc.findAll();
  }

  @Get(':id')
  @Roles('admin', 'coordinator')
  findOne(@Param('id') id: string) {
    return this.svc.findOne(id);
  }

  @Patch(':id')
  @Roles('admin', 'coordinator')
  update(@Param('id') id: string, @Body() dto: UpdateEnrollmentDto) {
    return this.svc.update(id, dto);
  }

  @Delete(':id')
  @Roles('admin')
  remove(@Param('id') id: string) {
    return this.svc.remove(id);
  }
}
