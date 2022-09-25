import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean, IsInt, IsObject, IsString,
} from 'class-validator';
import { IComponentIneractConfig, IComponentRequestConfig, IComponentStyleConfig } from 'common';

export class UpdateComponentDot {
  @ApiProperty() @IsInt() screenId: number;

  @ApiProperty() @IsInt() groupId: number;

  @ApiProperty() @IsString() layerName: string;

  @ApiProperty() @IsBoolean() isGroup: boolean;

  @ApiProperty() @IsBoolean() isLock: boolean;

  @ApiProperty() @IsBoolean() isLockAspectRatio: boolean;

  @ApiProperty() @IsInt() width: number;

  @ApiProperty() @IsInt() height: number;

  @ApiProperty() @IsInt() offsetX: number;

  @ApiProperty() @IsInt() offsetY: number;

  @ApiProperty() @IsInt() zIndex: number;

  @ApiProperty() @IsString() category: string;

  @ApiProperty() @IsString() subCategory: string;

  @ApiProperty() @IsObject() styleConfig: IComponentStyleConfig;

  @ApiProperty() @IsObject() requestConfig: IComponentRequestConfig;

  @ApiProperty() @IsObject() interactConfig: IComponentIneractConfig;
}
