import { ApiProperty } from '@nestjs/swagger';
import { EFillType } from '@pan/common';
import { IsString, IsInt, IsBoolean } from 'class-validator';

import { ComponentEntity } from '../entity/component.entity';

export class ComponentVo {
  @ApiProperty()
    id: string;

  @ApiProperty()
  @IsString()
    name: string;

  @ApiProperty({ required: false })
  @IsInt()
    width: number;

  @ApiProperty({ required: false })
  @IsInt()
    height: number;

  @ApiProperty({ required: false })
  @IsString()
    backgroupColor: string;

  @ApiProperty({ required: false })
  @IsString()
    backgroupImage: string;

  @ApiProperty({ required: false })
  @IsString()
    snaphotUrl: string;

  @ApiProperty({ required: false, enum: EFillType })
  @IsInt()
    fillType: number;

  @ApiProperty({ required: false })
  @IsBoolean()
    isTemplate: boolean;

  @ApiProperty({ required: false })
  @IsBoolean()
    isPublished: boolean;

  @ApiProperty()
    createdAt: string;

  @ApiProperty()
    updatedAt: string;

  constructor(component: ComponentEntity) {
    Object.assign(this, component);
    this.id = String(component.id);
  }

  static convert(component: ComponentEntity): ComponentVo {
    return new ComponentVo(component);
  }
}
