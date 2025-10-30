import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subscription } from './entities/subscription.entity';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';

@Injectable()
export class SubscriptionsService {
  constructor(
    @InjectRepository(Subscription)
    private readonly subRepo: Repository<Subscription>,
  ) {}

  create(dto: CreateSubscriptionDto) {
    const sub = this.subRepo.create(dto);
    return this.subRepo.save(sub);
  }

  findAll() {
    return this.subRepo.find({ relations: ['user', 'plan', 'payments'] });
  }

  async findOne(id: number) {
    const sub = await this.subRepo.findOne({
      where: { id },
      relations: ['user', 'plan', 'payments'],
    });
    if (!sub) throw new NotFoundException('Subscription not found');
    return sub;
  }

  async update(id: number, dto: UpdateSubscriptionDto) {
    const sub = await this.findOne(id);
    Object.assign(sub, dto);
    return this.subRepo.save(sub);
  }

  async remove(id: number) {
    const sub = await this.findOne(id);
    await this.subRepo.remove(sub);
    return { message: 'Subscription deleted successfully' };
  }
}
