import {
  Body, Controller, Delete, Get, Param, Patch, Post, Query,
} from '@nestjs/common';
import {
  ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags,
} from '@nestjs/swagger';

import { ResponseUtils } from '@/utils/response.utils';

import { ComponentService } from '../component/component.service';
import { ComponentVo } from '../component/vo/component.vo';

import { CreateScreenDto } from './dto/create-screen.dto';
import { QueryScreeDto } from './dto/query-screen.dto';
import { UpdateScreenDot } from './dto/update-screeen.dto';
import { ScreenService } from './screen.service';
import { ScreenVo } from './vo/screen.vo';

@Controller('screen')
export class ScreenController {
  constructor(
    private screenSerivce: ScreenService,
    private componentSrevice: ComponentService,
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
    type: ScreenVo,
    content: {
      base: {
        example: {
          id: '1',
          name: '测试大屏',
          width: 1920,
          height: 1080,
          backgroupColor: '',
          backgroupImage: '',
          snapshotUrl: '',
          fillType: 1,
          isPublished: false,
          isTemplate: false,
          createdAt: '2022-09-24T16:51:09.937Z',
          updatedAt: '2022-09-24T16:51:09.937Z',
        },
      },
    },
  })
  async findAll(@Query() query: QueryScreeDto) {
    const allScreens = await this.screenSerivce.findAll(query);
    return ResponseUtils.success(allScreens.map(ScreenVo.convert));
  }

  @Get(':screenId/components')
  @ApiTags('screen')
  @ApiOperation({ summary: '大屏的下所有组件', description: '没有分页功能' })
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
    type: ComponentVo,
    content: {
      base: {
        example: {
          id: '1',
          name: '测试大屏',
          width: 1920,
          height: 1080,
          backgroupColor: '',
          backgroupImage: '',
          snapshotUrl: '',
          fillType: 1,
          isPublished: false,
          isTemplate: false,
          createdAt: '2022-09-24T16:51:09.937Z',
          updatedAt: '2022-09-24T16:51:09.937Z',
        },
      },
    },
  })
  async findScreenAllComponents(@Param('screenId') screenId: number) {
    const compoennts = await this.componentSrevice.findAll({ screenId });
    return ResponseUtils.success(compoennts.map(ComponentVo.convert));
  }

  @Get(':screenId')
  @ApiTags('screen')
  @ApiOperation({ summary: '根据ID获取大屏' })
  @ApiParam({
    name: 'screenId',
    description: '大屏ID',
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: '大屏数据',
    type: ScreenVo,
  })
  async getById(@Param('screenId') screenId: number) {
    const screen = await this.screenSerivce.findById(screenId);
    return ResponseUtils.success(ScreenVo.convert(screen));
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
    type: ScreenVo,
  })
  async createScreen(@Body() createScreenDto: CreateScreenDto) {
    const screen = await this.screenSerivce.create(createScreenDto);
    return ResponseUtils.success(ScreenVo.convert(screen));
  }

  @Patch(':screenId')
  @ApiTags('screen')
  @ApiOperation({
    summary: '更新单个大屏数据',
  })
  @ApiParam({
    name: 'screenId',
    description: '大屏ID',
    type: Number,
  })
  @ApiBody({
    description: '需要更新大屏数据',
    type: UpdateScreenDot,
    examples: {
      base: {
        value: { name: '新的大屏名称', width: 100 },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: '更新后的大屏实例',
    type: ScreenVo,
  })
  async updateScreenById(
  @Param('screenId') screenId: number,
    @Body() updateScreenDto: UpdateScreenDot,
  ) {
    await this.screenSerivce.updataById(screenId, updateScreenDto);
    const screen = await this.screenSerivce.findById(screenId);
    return ResponseUtils.success(ScreenVo.convert(screen));
  }

  @Delete(':screenId')
  @ApiTags('screen')
  @ApiOperation({
    summary: '更新单个大屏数据',
  })
  @ApiParam({
    name: 'screenId',
    description: '大屏ID',
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: '更新后的大屏实例',
    type: Boolean,
  })
  async removeScreenById(@Param('screenId') screenId: number) {
    await this.screenSerivce.removeById(screenId);
    return ResponseUtils.success(true);
  }
}
