import { Injectable, BadRequestException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { UserRole } from '../entities/user.entity';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async validateUser(username: string, pass: string) {
    const user = await this.usersService.findByUsername(username);
    if (!user) return null;
    const matched = await bcrypt.compare(pass, user.password);
    if (matched) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id, role: user.role };
    return { access_token: this.jwtService.sign(payload) };
  }

  async register(dto: { username: string; password: string; role?: UserRole; related_id?: string }) {
    const exists = await this.usersService.findByUsername(dto.username);
    if (exists) throw new BadRequestException('Username already exists');
    const hashed = await bcrypt.hash(dto.password, 10);
    // dto.role already typed as UserRole; ensure TS knows create receives compatible type
    return this.usersService.create({ ...dto, password: hashed });
  }
}
