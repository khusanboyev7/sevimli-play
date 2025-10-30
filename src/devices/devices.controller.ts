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
import { DevicesService } from './devices.service';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { AdminRole } from 'src/admin/entities/admin.entity';

@ApiTags('devices')
@ApiBearerAuth()
@Controller('devices')
@UseGuards(JwtAuthGuard, RolesGuard)
export class DevicesController {
  constructor(private readonly devicesService: DevicesService) {}

  @Roles(AdminRole.SUPERADMIN, AdminRole.MODERATOR)
  @Post()
  create(@Body() dto: CreateDeviceDto) {
    return this.devicesService.create(dto);
  }

  @Roles(AdminRole.SUPERADMIN, AdminRole.MODERATOR)
  @Get()
  findAll() {
    return this.devicesService.findAll();
  }

  @Roles(AdminRole.SUPERADMIN, AdminRole.MODERATOR)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.devicesService.findOne(id);
  }

  @Roles(AdminRole.SUPERADMIN, AdminRole.MODERATOR)
  @Patch(':id')
  update(@Param('id') id: number, @Body() dto: UpdateDeviceDto) {
    return this.devicesService.update(id, dto);
  }

  @Roles(AdminRole.SUPERADMIN)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.devicesService.remove(id);
  }
}
