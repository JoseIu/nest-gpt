//DTO === Interface

import { IsInt, IsOptional, IsString } from 'class-validator';

export class OrthographyDto {
  @IsString()
  readonly req: string;

  @IsString()
  @IsOptional()
  readonly res?: string;

  @IsInt()
  @IsOptional()
  readonly maxTokens?: number;
}
