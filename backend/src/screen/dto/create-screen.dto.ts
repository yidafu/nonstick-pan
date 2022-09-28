import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsString } from 'class-validator';
import { EFillType } from '@pan/common';

export class CreateScreenDto {
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
}
