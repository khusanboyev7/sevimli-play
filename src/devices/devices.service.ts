import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Device } from './entities/device.entity';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';

@Injectable()
export class DevicesService {
  constructor(
    @InjectRepository(Device)
    private readonly deviceRepo: Repository<Device>,
  ) {}

  async create(dto: CreateDeviceDto): Promise<Device> {
    const newDevice = this.deviceRepo.create(dto);
    return this.deviceRepo.save(newDevice);
  }

  async findAll(): Promise<Device[]> {
    return this.deviceRepo.find({ relations: ['profile'] });
  }

  async findOne(id: number): Promise<Device> {
    const device = await this.deviceRepo.findOne({
      where: { id },
      relations: ['profile'],
    });
    if (!device) throw new NotFoundException('Device not found');
    return device;
  }

  async update(id: number, dto: UpdateDeviceDto): Promise<Device> {
    const device = await this.findOne(id);
    Object.assign(device, dto);
    return this.deviceRepo.save(device);
  }

  async remove(id: number): Promise<{ message: string }> {
    const device = await this.findOne(id);
    await this.deviceRepo.remove(device);
    return { message: 'Device deleted successfully' };
  }
}
