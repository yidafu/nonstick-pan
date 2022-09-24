import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Screen } from 'src/entity/screen.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ScreenService {
  constructor(
    @InjectRepository(Screen) private screenRepository: Repository<Screen>,
  ) {}

  findAll(): Promise<Screen[]> {
    return this.screenRepository.find();
  }
}
