import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

// Módulos del sistema
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

// Módulos académicos
import { SemestersModule } from './semesters/semesters.module';
import { TimeslotsModule } from './timeslots/timeslots.module';
import { RoomsModule } from './rooms/rooms.module';
import { TeachersModule } from './teachers/teachers.module';
import { CoursesModule } from './courses/courses.module';
import { OfferingsModule } from './offerings/offerings.module';
import { SectionsModule } from './sections/sections.module';
import { StudentsModule } from './students/students.module';
import { EnrollmentsModule } from './enrollments/enrollments.module';
import { SchedulesModule } from './schedules/schedules.module';
import { ConflictsModule } from './conflicts/conflicts.module';
import { AuditLogModule } from './audit/audit-log.module';

// 🔹 Agregado: módulo StudentSection
import { StudentSectionModule } from './student-section/student-section.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DATABASE_HOST'),
        port: Number(config.get('DATABASE_PORT')) || 5432,
        username: config.get<string>('DATABASE_USER'),
        password: config.get<string>('DATABASE_PASSWORD'),
        database: config.get<string>('DATABASE_NAME'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true, // Solo en desarrollo
        logging: false,
      }),
      inject: [ConfigService],
    }),

    // Módulos principales
    AuthModule,
    UsersModule,

    // Módulos académicos
    SemestersModule,
    TimeslotsModule,
    RoomsModule,
    TeachersModule,
    CoursesModule,
    OfferingsModule,
    SectionsModule,
    StudentsModule,
    EnrollmentsModule,
    SchedulesModule,
    ConflictsModule,

    // Módulo de auditoría
    AuditLogModule,

    // ✅ Módulo StudentSection agregado
    StudentSectionModule,
  ],
})
export class AppModule {}
