import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { ScreenEntity } from 'src/screen/entity/screen.entity';
import { Repository } from 'typeorm';

import { CreateScreenDto } from './dto/create-screen.dto';
import { QueryScreeDto } from './dto/query-screen.dto';
import { UpdateScreenDot } from './dto/update-screeen.dto';

@Injectable()
export class ScreenService {
  constructor(
    @InjectRepository(ScreenEntity) private screenRepository: Repository<ScreenEntity>,
  ) {}

  findAll(query: QueryScreeDto): Promise<ScreenEntity[]> {
    return this.screenRepository.find({ where: query });
  }

  findById(screenId: number): Promise<ScreenEntity> {
    return this.screenRepository.findOne({ where: { id: screenId } });
  }

  create(dto: CreateScreenDto): Promise<ScreenEntity> {
    return this.screenRepository.save(dto);
  }

  updataById(screenId: number, dto: UpdateScreenDot) {
    return this.screenRepository.update({ id: screenId }, dto);
  }

  async removeById(screenId: number) {
    const result = await this.screenRepository.delete({ id: screenId });
    return result.affected > 0;
  }
}
