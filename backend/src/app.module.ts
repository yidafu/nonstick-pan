import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ComponentModule } from './component/component.module';
import { ComponentEntity } from './component/entity/component.entity';
import config from './config';
import { ScreenEntity } from './screen/entity/screen.entity';
import { ScreenModule } from './screen/screen.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'ydfhs123',
      database: 'visualization_screen',
      entities: [ScreenEntity, ComponentEntity],
      logging: true,
    }),
    ScreenModule,
    ComponentModule,
  ],
  controllers: [AppController],
  providers: [AppService, Logger],
})
export class AppModule {}
