import {
  Body, Controller, Delete, Get, Logger, Param, Patch, Post, Query,
} from '@nestjs/common';
import {
  ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags,
} from '@nestjs/swagger';

import { ComponentService } from './component.service';
import { BatchUpdateComponentDot } from './dto/batch-update-screeen.dto';
import { CreateComponentDto } from './dto/create-component.dto';
import { QueryComponentDto } from './dto/query-component.dto';
import { UpdateComponentDot } from './dto/update-screeen.dto';
import { ComponentVo } from './vo/component.vo';

import { ResponseUtils } from '@/utils/response.utils';

const EXAMPLE_COMPONENT_DATA = {
  id: '1',
  screenId: '1',
  groupId: '0',
  name: '测试组件',
  layerName: '未命名组件',
  isGroup: false,
  isLock: false,
  isLockAspectRatio: false,
  width: 0,
  height: 0,
  offsetX: 0,
  offsetY: 0,
  zIndex: 0,
  category: 'unknown',
  subCategory: 'unknown',
  styleConfig: {},
  requestConfig: {},
  interactConfig: {},
  createdAt: '2022-09-25 12:47:42',
  updatedAt: '2022-09-25 12:47:42',
};

@Controller('component')
export class ComponentController {
  private readonly logger = new Logger(ComponentController.name);

  constructor(
    private componentSerivce: ComponentService,
  ) {}

  @Get('all')
  @ApiTags('component')
  @ApiOperation({ summary: '获取组件列表', description: '没有分页功能' })
  @ApiResponse({
    status: 200,
    description: '组件列表',
    isArray: true,
    type: ComponentVo,
    content: {
      base: {
        example: [EXAMPLE_COMPONENT_DATA],
      },
    },
  })
  async findAll(@Query() query: QueryComponentDto) {
    const allComponents = await this.componentSerivce.findAll(query);
    return ResponseUtils.success(allComponents.map(ComponentVo.convert));
  }

  @Get(':componentId')
  @ApiTags('component')
  @ApiOperation({ summary: '根据ID获取组件' })
  @ApiParam({
    name: 'componentId',
    description: '组件ID',
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: '组件数据',
    type: ComponentVo,
    content: {
      base: { example: EXAMPLE_COMPONENT_DATA },
    },
  })
  async getById(@Param('componentId') componentId: number) {
    const component = await this.componentSerivce.findById(componentId);
    return ResponseUtils.success(ComponentVo.convert(component));
  }

  @Post()
  @ApiTags('component')
  @ApiOperation({
    summary: '创建组件',
  })
  @ApiBody({
    description: '要创建组件数据',
    type: CreateComponentDto,
    examples: {
      base: {
        summary: '最简单场景',
        description: '默认只需要传一个 name 字段即可',
        value: {
          layerName: '测试组件',
          screenId: 1,
          styleConfig: {},
          requestConfig: {},
          interactConfig: {},
          styleLabelConfig: [],
          name: 'PanEchartBar',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: '创建好的组件实例',
    type: ComponentVo,
    content: {
      base: { example: EXAMPLE_COMPONENT_DATA },
    },
  })
  async createComponent(@Body() createComponentDto: CreateComponentDto) {
    const component = await this.componentSerivce.create(createComponentDto);
    return ResponseUtils.success(ComponentVo.convert(component));
  }

  @Patch('batch')
  @ApiTags('component')
  @ApiOperation({
    summary: '批量更新组件数据',
  })
  @ApiBody({
    description: '需要更新组件数据',
    isArray: true,
    type: BatchUpdateComponentDot,
    examples: {
      base: {
        value: [
          { id: 1, layerName: '新的组件名称', width: 100 },
          { id: 2, layerName: '新的组件名称-2', offsetX: 100 },
        ],
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: '更新后的组件实例',
    type: ComponentVo,
    content: {
      base: { example: EXAMPLE_COMPONENT_DATA },
    },
  })
  async batchUpdateComponentById(
  @Body() updateComponentDto: BatchUpdateComponentDot[],
  ) {
    this.logger.log('[component] batch update body => %o', updateComponentDto);
    await this.componentSerivce.batchUpdate(updateComponentDto);
    const components = await this.componentSerivce.findByIdList(
      updateComponentDto.map((dto) => dto.id),
    );
    return ResponseUtils.success(components.map(ComponentVo.convert));
  }

  @Patch(':componentId')
  @ApiTags('component')
  @ApiOperation({
    summary: '更新单个组件数据',
  })
  @ApiParam({
    name: 'componentId',
    description: '组件ID',
    type: Number,
  })
  @ApiBody({
    description: '需要更新组件数据',
    type: UpdateComponentDot,
    examples: {
      base: {
        value: { name: '新的组件名称', width: 100 },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: '更新后的组件实例',
    type: ComponentVo,
    content: {
      base: { example: EXAMPLE_COMPONENT_DATA },
    },
  })
  async updateComponentById(
  @Param('componentId') componentId: number,
    @Body() updateComponentDto: UpdateComponentDot,
  ) {
    await this.componentSerivce.updataById(componentId, updateComponentDto);
    const component = await this.componentSerivce.findById(componentId);
    return ResponseUtils.success(ComponentVo.convert(component));
  }

  @Delete(':componentId')
  @ApiTags('component')
  @ApiOperation({
    summary: '删除指定组件',
  })
  @ApiParam({
    name: 'componentId',
    description: '组件ID',
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: '是否删除成功',
    type: Boolean,
  })
  async removeScreenById(@Param('componentId') screenId: number) {
    await this.componentSerivce.removeById(screenId);
    return ResponseUtils.success(true);
  }
}
