import {
  Body, Controller, Get, Post, Query,
} from '@nestjs/common';
import {
  ApiBody, ApiOperation, ApiQuery, ApiResponse, ApiTags,
} from '@nestjs/swagger';

import { CreateScreenDto } from './dto/create-screen.dto';
import { QueryScreeDto } from './dto/query-screen.dto';
import { Screen } from './entity/screen.entity';
import { ScreenService } from './screen.service';

@Controller('screen')
export class ScreenController {
  constructor(
    private screenSerivce: ScreenService,
  ) {}

  @Get('all')
  @ApiTags('screen')
  @ApiOperation({ summary: '获取大屏列表', description: '没有分页功能' })
  @ApiQuery({
    description: '是否是模板',
    name: 'isTemplate',
    type: Boolean,
  })
  @ApiQuery({
    description: '是否已发布',
    name: 'isPublished',
    type: Boolean,
  })
  @ApiResponse({
    status: 200,
    description: '大屏列表',
    isArray: true,
    type: Screen,
  })
  async findAll(@Query() query: QueryScreeDto) {
    const allScreens = await this.screenSerivce.findAll(query);
    return allScreens;
  }

  @Post()
  @ApiTags('screen')
  @ApiOperation({
    summary: '创建大屏',
  })
  @ApiBody({
    description: '要创建大屏数据',
    type: CreateScreenDto,
    examples: {
      base: {
        summary: '最简单场景',
        description: '默认只需要传一个 name 字段即可',
        value: { name: '测试大屏' },
      },
      full: {
        summary: '完整参数',
        description: '',
        value: {
          name: '测试大屏',
          width: 1920,
          height: 1080,
          backgroupColor: '',
          backgroupImage: '',
          snapshotUrl: '',
          fillType: 0,
          isPublished: false,
          isTemplate: false,
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: '创建好的大屏实例',
    type: Screen,
  })
  async createScreen(@Body() createScreenDto: CreateScreenDto) {
    return this.screenSerivce.create(createScreenDto);
  }
}
