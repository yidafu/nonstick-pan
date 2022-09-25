import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

export class QueryScreeDto {
  @ApiProperty({ required: false })
  @IsBoolean()
    isTemplate?: boolean;

  @ApiProperty({ required: false })
  @IsBoolean()
    isPublished?: boolean;
}
