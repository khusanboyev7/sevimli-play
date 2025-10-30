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
import { ProfilesService } from './profiles.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { AdminRole } from 'src/admin/entities/admin.entity';

@ApiTags('profiles')
@ApiBearerAuth()
@Controller('profiles')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Roles(AdminRole.SUPERADMIN, AdminRole.MODERATOR)
  @Post()
  create(@Body() dto: CreateProfileDto) {
    return this.profilesService.create(dto);
  }

  @Roles(AdminRole.SUPERADMIN, AdminRole.MODERATOR)
  @Get()
  findAll() {
    return this.profilesService.findAll();
  }

  @Roles(AdminRole.SUPERADMIN, AdminRole.MODERATOR)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.profilesService.findOne(id);
  }

  @Roles(AdminRole.SUPERADMIN, AdminRole.MODERATOR)
  @Patch(':id')
  update(@Param('id') id: number, @Body() dto: UpdateProfileDto) {
    return this.profilesService.update(id, dto);
  }

  @Roles(AdminRole.SUPERADMIN)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.profilesService.remove(id);
  }
}
