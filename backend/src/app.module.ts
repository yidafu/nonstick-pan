import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import config from './config';
import { entityArray } from './entity';
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
      entities: entityArray,
    }),
    ScreenModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
