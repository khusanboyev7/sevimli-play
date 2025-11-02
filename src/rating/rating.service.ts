import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rating } from './entities/rating.entity';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';

@Injectable()
export class RatingsService {
  constructor(
    @InjectRepository(Rating)
    private readonly ratingRepo: Repository<Rating>,
  ) {}

  create(dto: CreateRatingDto) {
    const rating = this.ratingRepo.create(dto);
    return this.ratingRepo.save(rating);
  }

  findAll() {
    return this.ratingRepo.find({ relations: ['content', 'profile'] });
  }

  async findOne(id: number) {
    const rating = await this.ratingRepo.findOne({
      where: { id },
      relations: ['content', 'profile'],
    });
    if (!rating) throw new NotFoundException('Rating not found');
    return rating;
  }

  async update(id: number, dto: UpdateRatingDto) {
    const rating = await this.findOne(id);
    Object.assign(rating, dto);
    return this.ratingRepo.save(rating);
  }

  async remove(id: number) {
    const rating = await this.findOne(id);
    return this.ratingRepo.remove(rating);
  }
}
