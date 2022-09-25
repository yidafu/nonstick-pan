import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { CreateScreenDto } from './dto/create-screen.dto';
import { QueryScreeDto } from './dto/query-screen.dto';

import { Screen } from '@/screen/entity/screen.entity';

@Injectable()
export class ScreenService {
  constructor(
    @InjectRepository(Screen) private screenRepository: Repository<Screen>,
  ) {}

  findAll(query: QueryScreeDto): Promise<Screen[]> {
    return this.screenRepository.find({ where: query });
  }

  create(dto: CreateScreenDto) {
    return this.screenRepository.save(dto);
  }
}
