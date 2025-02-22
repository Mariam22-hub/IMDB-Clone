import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Genre } from '../entities/Genre/genre.entity';
import { Repository, Like } from 'typeorm';

@Injectable()
export class GenreService {
  constructor(
    @InjectRepository(Genre)
    private readonly genreRepository: Repository<Genre>,
  ) {}

  async getAll(): Promise<Genre[]> {
    return await this.genreRepository.find();
  }
}
