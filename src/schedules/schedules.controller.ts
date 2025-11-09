import { Controller, Post, Body, Get, Param, Patch, Delete, UseGuards } from '@nestjs/common';
import { SchedulesService } from './schedules.service';
import { CreateRoomScheduleDto } from './dto/create-room-schedule.dto';
import { UpdateRoomScheduleDto } from './dto/update-room-schedule.dto';
import { CreateTeacherScheduleDto } from './dto/create-teacher-schedule.dto';
import { UpdateTeacherScheduleDto } from './dto/update-teacher-schedule.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('schedules')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class SchedulesController {
  constructor(private svc: SchedulesService) {}

  // Room schedules
  @Post('rooms') @Roles('admin','coordinator') createRoom(@Body() dto: CreateRoomScheduleDto) { return this.svc.createRoomSchedule(dto); }
  @Get('rooms') @Roles('admin','coordinator') findAllRooms() { return this.svc.findAllRoomSchedules(); }
  @Get('rooms/:id') @Roles('admin','coordinator') findOneRoom(@Param('id') id: string) { return this.svc.findRoomSchedule(id); }
  @Patch('rooms/:id') @Roles('admin') updateRoom(@Param('id') id: string, @Body() dto: UpdateRoomScheduleDto) { return this.svc.updateRoomSchedule(id, dto); }
  @Delete('rooms/:id') @Roles('admin') removeRoom(@Param('id') id: string) { return this.svc.removeRoomSchedule(id); }

  // Teacher schedules
  @Post('teachers') @Roles('admin','coordinator') createTeacher(@Body() dto: CreateTeacherScheduleDto) { return this.svc.createTeacherSchedule(dto); }
  @Get('teachers') @Roles('admin','coordinator') findAllTeachers() { return this.svc.findAllTeacherSchedules(); }
  @Get('teachers/:id') @Roles('admin','coordinator','teacher') findOneTeacher(@Param('id') id: string) { return this.svc.findTeacherSchedule(id); }
  @Patch('teachers/:id') @Roles('admin') updateTeacher(@Param('id') id: string, @Body() dto: UpdateTeacherScheduleDto) { return this.svc.updateTeacherSchedule(id, dto); }
  @Delete('teachers/:id') @Roles('admin') removeTeacher(@Param('id') id: string) { return this.svc.removeTeacherSchedule(id); }
}
