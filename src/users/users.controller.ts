import { Controller, Get, Post, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('users')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class UsersController {
  constructor(private usersService: UsersService) {}

  // 🔹 Permitir que tanto admin como coordinator puedan listar usuarios
  @Get()
  @Roles('admin', 'coordinator')
  getAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @Roles('admin', 'coordinator')
  getOne(@Param('id') id: string) {
    return this.usersService.findById(id);
  }

  @Post()
  @Roles('admin')
  create(@Body() body: any) {
    return this.usersService.create(body);
  }

  @Delete(':id')
  @Roles('admin')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
