import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ComponentEntity } from 'src/component/entity/component.entity';

import { ComponentController } from './component.controller';
import { ComponentService } from './component.service';

@Module({
  imports: [TypeOrmModule.forFeature([ComponentEntity])],
  providers: [ComponentService],
  controllers: [ComponentController],
  exports: [ComponentService],
})
export class ComponentModule {}
