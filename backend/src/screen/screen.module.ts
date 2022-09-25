import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ScreenController } from './screen.controller';
import { ScreenService } from './screen.service';

import { Screen } from '@/screen/entity/screen.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Screen])],
  providers: [ScreenService],
  controllers: [ScreenController],
})
export class ScreenModule {}
