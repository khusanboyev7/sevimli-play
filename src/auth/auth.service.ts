import {
  Injectable,
  UnauthorizedException,
  ForbiddenException,
  OnModuleInit,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin, AdminRole } from '../admin/entities/admin.entity';
import { User } from '../users/entities/user.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService implements OnModuleInit {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepo: Repository<Admin>,

    @InjectRepository(User)
    private readonly userRepo: Repository<User>,

    private readonly jwt: JwtService,
    private readonly config: ConfigService,
  ) {}

  // ✅ SuperAdmin mavjudligini tekshiruvchi qism
  // ✅ SuperAdmin mavjudligini tekshiruvchi qism
  async onModuleInit() {
    const email = this.config.get<string>('SUPERADMIN_EMAIL');
    const password = this.config.get<string>('SUPERADMIN_PASSWORD');

    if (!email || !password) {
      console.warn('⚠️ SUPERADMIN_EMAIL yoki SUPERADMIN_PASSWORD yo‘q');
      return;
    }

    const exist = await this.adminRepo.findOne({ where: { email } });
    if (!exist) {
      const hash = await bcrypt.hash(password, 10);
      const superAdmin = this.adminRepo.create({
        email,
        password: hash,
        full_name: 'System SuperAdmin',
        role: AdminRole.SUPERADMIN,
      });
      await this.adminRepo.save(superAdmin);

      console.log('✅ SuperAdmin yaratildi!');
      console.log(`📧 Email: ${email}`);
      console.log(`🔑 Password: ${password}`);
    } else {
      console.log('ℹ️ SuperAdmin allaqachon mavjud.');
      console.log(`📧 Email: ${email}`);
      console.log(`🔑 Password: ${password}`);
    }
  }

  // ✅ SIGNUP — token qaytarmaydi
  async userSignup(dto: any) {
    const existEmail = await this.userRepo.findOne({
      where: { email: dto.email },
    });
    if (existEmail) throw new UnauthorizedException('Email already exists');

    const existPhone = await this.userRepo.findOne({
      where: { phone: dto.phone },
    });
    if (existPhone) throw new UnauthorizedException('Phone already exists');

    const hash = await bcrypt.hash(dto.password, 10);

    const newUser = this.userRepo.create({
      email: dto.email,
      password: hash,
      phone: dto.phone,
      is_email_verified: false,
    });

    await this.userRepo.save(newUser);

    return { message: 'User registered successfully' }; // token qaytmaydi
  }

  // ✅ SIGNIN — token qaytaradi
  async userSignin(dto: any) {
    const user = await this.userRepo.findOne({ where: { email: dto.email } });
    if (!user) throw new UnauthorizedException('User not found');

    const valid = await bcrypt.compare(dto.password, user.password);
    if (!valid) throw new UnauthorizedException('Invalid password');

    const tokens = await this.getTokens(user.id, 'user');
    return { message: 'Login successful', ...tokens };
  }

  async login(dto: any) {
    const admin = await this.adminRepo.findOne({ where: { email: dto.email } });
    if (!admin) throw new UnauthorizedException('Admin not found');

    const valid = await bcrypt.compare(dto.password, admin.password);
    if (!valid) throw new UnauthorizedException('Invalid password');

    const tokens = await this.getTokens(admin.id, admin.role);

    return {
      message: `${
        admin.role === AdminRole.SUPERADMIN ? 'SuperAdmin' : 'Moderator'
      } login successful`,
      admin: {
        id: admin.id,
        full_name: admin.full_name,
        email: admin.email,
        role: admin.role,
      },
      ...tokens,
    };
  }

  async createAdmin(superAdminId: number, dto: any) {
    const superAdmin = await this.adminRepo.findOne({
      where: { id: superAdminId },
    });
    if (!superAdmin || superAdmin.role !== AdminRole.SUPERADMIN) {
      throw new ForbiddenException('Only superAdmin can create admins');
    }

    const exist = await this.adminRepo.findOne({ where: { email: dto.email } });
    if (exist) throw new UnauthorizedException('Email already exists');

    const hash = await bcrypt.hash(dto.password, 10);
    const newAdmin = this.adminRepo.create({
      email: dto.email,
      password: hash,
      full_name: dto.full_name,
      role: dto.role || AdminRole.MODERATOR,
    });

    const savedAdmin = await this.adminRepo.save(newAdmin);
    const tokens = await this.getTokens(savedAdmin.id, savedAdmin.role);
    return { message: 'Admin created successfully', ...tokens };
  }

  async logout() {
    return { message: 'Logged out successfully' };
  }

  async refreshToken(userId: number, role: string) {
    const tokens = await this.getTokens(userId, role);
    return { message: 'Token refreshed', ...tokens };
  }

  async getTokens(userId: number, role: string) {
    const payload = { sub: userId, role };

    const access_token = await this.jwt.signAsync(payload, {
      secret: this.config.get<string>('JWT_ACCESS_SECRET'),
      expiresIn: (this.config.get<string>('JWT_ACCESS_EXPIRE') as any) || '15m',
    });

    const refresh_token = await this.jwt.signAsync(payload, {
      secret: this.config.get<string>('JWT_REFRESH_SECRET'),
      expiresIn: (this.config.get<string>('JWT_REFRESH_EXPIRE') as any) || '7d',
    });

    return {
      access_token,
      refresh_token,
    };
  }
}
