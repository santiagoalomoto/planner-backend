import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OfferingsService } from './offerings.service';
import { OfferingsController } from './offerings.controller';
import { CourseOffering } from '../entities/offering.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CourseOffering])],
  providers: [OfferingsService],
  controllers: [OfferingsController],
  exports: [OfferingsService],
})
export class OfferingsModule {}
