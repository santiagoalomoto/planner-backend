import { Controller, Post, Body, Get, Param, Patch, Delete, UseGuards } from '@nestjs/common';
import { OfferingsService } from './offerings.service';
import { CreateOfferingDto } from './dto/create-offering.dto';
import { UpdateOfferingDto } from './dto/update-offering.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('offerings')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class OfferingsController {
  constructor(private svc: OfferingsService) {}
  @Post() @Roles('admin','coordinator') create(@Body() dto: CreateOfferingDto){ return this.svc.create(dto); }
  @Get() @Roles('admin','coordinator') findAll(){ return this.svc.findAll(); }
  @Get(':id') @Roles('admin','coordinator') findOne(@Param('id') id:string){ return this.svc.findOne(id); }
  @Patch(':id') @Roles('admin','coordinator') update(@Param('id') id:string, @Body() dto: UpdateOfferingDto){ return this.svc.update(id,dto); }
  @Delete(':id') @Roles('admin') remove(@Param('id') id:string){ return this.svc.remove(id); }
}
