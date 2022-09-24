import { Controller, Get } from '@nestjs/common';

import { ScreenService } from './screen.service';

@Controller('screen')
export class ScreenController {
  constructor(
    private screenSerivce: ScreenService,
  ) {}

  @Get('all')
  async findAll() {
    const allScreens = await this.screenSerivce.findAll();
    return allScreens;
  }
}
