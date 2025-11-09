import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnrollmentsService } from './enrollments.service';
import { EnrollmentsController } from './enrollments.controller';
import { Enrollment } from '../entities/enrollment.entity';
import { Section } from '../entities/section.entity'; // ✅ importa la entidad Section

@Module({
  imports: [
    TypeOrmModule.forFeature([Enrollment, Section]), // ✅ registra ambas entidades
  ],
  providers: [EnrollmentsService],
  controllers: [EnrollmentsController],
  exports: [EnrollmentsService],
})
export class EnrollmentsModule {}
