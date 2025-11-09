import { Controller, Post, Body, Get, Param, Patch, Delete, UseGuards } from '@nestjs/common';
import { TimeslotsService } from './timeslots.service';
import { CreateTimeslotDto } from './dto/create-timeslot.dto';
import { UpdateTimeslotDto } from './dto/update-timeslot.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('timeslots')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class TimeslotsController {
  constructor(private svc: TimeslotsService) {}
  @Post() @Roles('admin') create(@Body() dto: CreateTimeslotDto){ return this.svc.create(dto); }
  @Get() @Roles('admin','coordinator') findAll(){ return this.svc.findAll(); }
  @Get(':id') @Roles('admin','coordinator') findOne(@Param('id') id:string){ return this.svc.findOne(id); }
  @Patch(':id') @Roles('admin') update(@Param('id') id:string, @Body() dto: UpdateTimeslotDto){ return this.svc.update(id,dto); }
  @Delete(':id') @Roles('admin') remove(@Param('id') id:string){ return this.svc.remove(id); }
}
