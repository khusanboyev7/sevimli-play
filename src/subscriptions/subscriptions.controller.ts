import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SubscriptionsService } from './subscriptions.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';

@ApiTags('subscriptions')
@ApiBearerAuth()
@Controller('subscriptions')
export class SubscriptionsController {
  constructor(private readonly subService: SubscriptionsService) {}

  @Post()
  create(@Body() dto: CreateSubscriptionDto) {
    return this.subService.create(dto);
  }

  @Get()
  findAll() {
    return this.subService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.subService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() dto: UpdateSubscriptionDto) {
    return this.subService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.subService.remove(id);
  }
}
