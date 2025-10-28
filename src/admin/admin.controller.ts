import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AdminsService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { AdminRole } from './entities/admin.entity';

@ApiTags('admins')
@ApiBearerAuth()
@Controller('admins')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}

  @Roles(AdminRole.SUPERADMIN)
  @Post()
  create(@Body() dto: CreateAdminDto) {
    return this.adminsService.create(dto);
  }

  @Roles(AdminRole.SUPERADMIN)
  @Get()
  findAll() {
    return this.adminsService.findAll();
  }

  @Roles(AdminRole.SUPERADMIN, AdminRole.MODERATOR)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.adminsService.findOne(id);
  }

  @Roles(AdminRole.SUPERADMIN)
  @Patch(':id')
  update(@Param('id') id: number, @Body() dto: UpdateAdminDto) {
    return this.adminsService.update(id, dto);
  }

  @Roles(AdminRole.SUPERADMIN)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.adminsService.remove(id);
  }
}
