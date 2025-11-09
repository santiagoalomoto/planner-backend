import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TimeslotsService } from './timeslots.service';
import { TimeslotsController } from './timeslots.controller';
import { Timeslot } from '../entities/timeslot.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Timeslot])],
  providers: [TimeslotsService],
  controllers: [TimeslotsController],
  exports: [TimeslotsService],
})
export class TimeslotsModule {}
