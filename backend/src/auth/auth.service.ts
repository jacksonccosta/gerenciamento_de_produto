import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { LoginDto, RegisterDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async login(loginDto: LoginDto) {
    const user = await this.prisma.user.findUnique({ where: { email: loginDto.email } });
    if (!user || !(await bcrypt.compare(loginDto.password, user.password))) {
      throw new UnauthorizedException('Credenciais inválidas');
    }
    return {
      access_token: this.jwtService.sign({ email: user.email, sub: user.id }),
    };
  }

  async register(registerDto: RegisterDto) {
    const existing = await this.prisma.user.findUnique({ where: { email: registerDto.email } });
    if (existing) throw new ConflictException('Email já cadastrado');

    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    const user = await this.prisma.user.create({
      data: { ...registerDto, password: hashedPassword },
    });
    return { id: user.id, email: user.email, name: user.name };
  }
}