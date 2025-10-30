import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Plan } from './entities/plan.entity';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';

@Injectable()
export class PlansService {
  constructor(
    @InjectRepository(Plan)
    private readonly planRepo: Repository<Plan>,
  ) {}

  create(dto: CreatePlanDto) {
    const plan = this.planRepo.create(dto);
    return this.planRepo.save(plan);
  }

  findAll() {
    return this.planRepo.find({ relations: ['subscriptions'] });
  }

  async findOne(id: number) {
    const plan = await this.planRepo.findOne({
      where: { id },
      relations: ['subscriptions'],
    });
    if (!plan) throw new NotFoundException('Plan not found');
    return plan;
  }

  async update(id: number, dto: UpdatePlanDto) {
    const plan = await this.findOne(id);
    Object.assign(plan, dto);
    return this.planRepo.save(plan);
  }

  async remove(id: number) {
    const plan = await this.findOne(id);
    await this.planRepo.remove(plan);
    return { message: 'Plan deleted successfully' };
  }
}
