import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from './entities/payment.entity';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private readonly payRepo: Repository<Payment>,
  ) {}

  create(dto: CreatePaymentDto) {
    const payment = this.payRepo.create(dto);
    return this.payRepo.save(payment);
  }

  findAll() {
    return this.payRepo.find({ relations: ['user', 'subscription'] });
  }

  async findOne(id: number) {
    const payment = await this.payRepo.findOne({
      where: { id },
      relations: ['user', 'subscription'],
    });
    if (!payment) throw new NotFoundException('Payment not found');
    return payment;
  }

  async update(id: number, dto: UpdatePaymentDto) {
    const payment = await this.findOne(id);
    Object.assign(payment, dto);
    return this.payRepo.save(payment);
  }

  async remove(id: number) {
    const payment = await this.findOne(id);
    await this.payRepo.remove(payment);
    return { message: 'Payment deleted successfully' };
  }
}
