import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Screen } from 'src/entity/screen.entity';

import { ScreenController } from './screen.controller';
import { ScreenService } from './screen.service';

@Module({
  imports: [TypeOrmModule.forFeature([Screen])],
  providers: [ScreenService],
  controllers: [ScreenController],
})
export class ScreenModule {}
