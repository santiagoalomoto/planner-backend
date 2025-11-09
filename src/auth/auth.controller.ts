import { Controller, Post, Body, Get, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserRole } from '../entities/user.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() body: { username: string; password: string; role?: UserRole; related_id?: string }) {
    const user = await this.authService.register(body as any);
    return { id: user.id, username: user.username, role: user.role };
  }

  @Post('login')
  async login(@Body() body: { username: string; password: string }) {
    const user = await this.authService.validateUser(body.username, body.password);
    if (!user) throw new Error('Credenciales inválidas');
    return this.authService.login(user);
  }

  // ✅ Nuevo endpoint: obtener usuario autenticado
  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  async getProfile(@Req() req) {
    return req.user; // El usuario decodificado desde el token JWT
  }
}
