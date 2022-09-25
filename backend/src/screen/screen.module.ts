import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ComponentModule } from 'src/component/component.module';

import { ScreenEntity } from 'src/screen/entity/screen.entity';

import { ScreenController } from './screen.controller';
import { ScreenService } from './screen.service';

@Module({
  imports: [TypeOrmModule.forFeature([ScreenEntity]), ComponentModule],
  providers: [ScreenService],
  controllers: [ScreenController],
})
export class ScreenModule {}
