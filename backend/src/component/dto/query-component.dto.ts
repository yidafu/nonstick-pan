import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';

export class QueryComponentDto {
  @ApiProperty({ required: false })
  @IsString()
    name?: string;

  @ApiProperty({ required: false })
  @IsBoolean()
    componentId?: boolean;

  @ApiProperty({ required: false })
  @IsBoolean()
    screenId?: number;
}
