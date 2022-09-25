import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsBoolean } from 'class-validator';
import { EFillType } from 'common';

import { ScreenEntity } from '../entity/screen.entity';

export class ScreenVo {
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

  constructor(screen: ScreenEntity) {
    Object.assign(this, screen);
    this.id = String(screen.id);
  }

  static convert(screen: ScreenEntity): ScreenVo {
    return new ScreenVo(screen);
  }
}
