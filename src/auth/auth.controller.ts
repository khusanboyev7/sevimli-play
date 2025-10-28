import { Controller, Post, Body, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { CreateAdminDto } from '../admin/dto/create-admin.dto';
import { LoginAdminDto } from '../admin/dto/login-admin.dto';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { AdminRole } from '../admin/entities/admin.entity';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // 🔹 USER signup
  @ApiOperation({ summary: 'User signup' })
  @Post('user/signup')
  signupUser(@Body() dto: CreateUserDto) {
    return this.authService.userSignup(dto);
  }

  // 🔹 USER signin
  @ApiOperation({ summary: 'User signin' })
  @Post('user/signin')
  signinUser(@Body() dto: LoginUserDto) {
    return this.authService.userSignin(dto);
  }

  // 🔹 ADMIN login
  @ApiOperation({ summary: 'Admin login' })
  @Post('/login')
  loginAdmin(@Body() dto: LoginAdminDto) {
    return this.authService.login(dto);
  }

  // 🔹 SUPERADMIN yangi admin yoki moderator yaratadi
  @ApiOperation({ summary: 'SuperAdmin creates admin/moderator' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(AdminRole.SUPERADMIN)
  @Post('admin/create')
  createAdmin(@Req() req, @Body() dto: CreateAdminDto) {
    return this.authService.createAdmin(req.user.sub, dto);
  }

  // 🔹 LOGOUT
  @ApiOperation({ summary: 'Logout (token clear)' })
  @UseGuards(JwtAuthGuard)
  @Post('logout')
  logout() {
    return this.authService.logout();
  }

  // 🔹 REFRESH token
  @ApiOperation({ summary: 'Refresh token' })
  @UseGuards(JwtAuthGuard)
  @Post('refresh')
  refresh(@Req() req) {
    return this.authService.refreshToken(req.user.sub, req.user.role);
  }
}
