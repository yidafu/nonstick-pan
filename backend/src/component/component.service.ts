import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { In, Repository } from 'typeorm';

import { ComponentEntity } from 'src/component/entity/component.entity';

import { BatchUpdateComponentDot } from './dto/batch-update-screeen.dto';

import { CreateComponentDto } from './dto/create-component.dto';
import { QueryComponentDto } from './dto/query-component.dto';
import { UpdateComponentDot } from './dto/update-screeen.dto';

@Injectable()
export class ComponentService {
  private logger = new Logger(ComponentService.name);

  constructor(
    @InjectRepository(ComponentEntity) private componentRepository: Repository<ComponentEntity>,
  ) {}

  findAll(query: QueryComponentDto): Promise<ComponentEntity[]> {
    return this.componentRepository.find({ where: query });
  }

  findById(componentId: number): Promise<ComponentEntity> {
    return this.componentRepository.findOne({ where: { id: componentId } });
  }

  findByIdList(componentIdList: number[]): Promise<ComponentEntity[]> {
    return this.componentRepository.find({ where: { id: In<number>(componentIdList) } });
  }

  create(dto: CreateComponentDto): Promise<ComponentEntity> {
    return this.componentRepository.save(dto);
  }

  updataById(componentId: number, dto: UpdateComponentDot) {
    return this.componentRepository.update({ id: componentId }, dto);
  }

  async batchUpdate(dtos: BatchUpdateComponentDot[]) {
    const updatePromises = dtos.map(
      ({ id, ...restDto }) => this.componentRepository.update({ id }, restDto),
    );
    this.logger.log('before batch update database');
    await Promise.all(updatePromises);
  }

  async removeById(componentId: number) {
    const result = await this.componentRepository.delete({ id: componentId });
    return result.affected > 0;
  }
}
