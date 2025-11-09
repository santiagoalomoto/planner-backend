  import { Module } from '@nestjs/common';
  import { TypeOrmModule } from '@nestjs/typeorm';
  import { SemestersService } from './semesters.service';
  import { SemestersController } from './semesters.controller';
  import { Semester } from '../entities/semester.entity';

  @Module({
    imports: [TypeOrmModule.forFeature([Semester])],
    providers: [SemestersService],
    controllers: [SemestersController],
    exports: [SemestersService],
  })
  export class SemestersModule {}
