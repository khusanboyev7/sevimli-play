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
import { ContentsService } from './contents.service';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { AdminRole } from 'src/admin/entities/admin.entity';

@ApiTags('contents')
@ApiBearerAuth()
@Controller('contents')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ContentsController {
  constructor(private readonly contentsService: ContentsService) {}

  @Roles(AdminRole.SUPERADMIN, AdminRole.MODERATOR)
  @Post()
  create(@Body() dto: CreateContentDto) {
    return this.contentsService.create(dto);
  }

  @Roles(AdminRole.SUPERADMIN, AdminRole.MODERATOR)
  @Get()
  findAll() {
    return this.contentsService.findAll();
  }

  @Roles(AdminRole.SUPERADMIN, AdminRole.MODERATOR)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.contentsService.findOne(id);
  }

  @Roles(AdminRole.SUPERADMIN, AdminRole.MODERATOR)
  @Patch(':id')
  update(@Param('id') id: number, @Body() dto: UpdateContentDto) {
    return this.contentsService.update(id, dto);
  }

  @Roles(AdminRole.SUPERADMIN)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.contentsService.remove(id);
  }
}
