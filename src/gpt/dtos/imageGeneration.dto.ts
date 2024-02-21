import { IsOptional, IsString } from 'class-validator';

export class imageGenerationDto {
  @IsString()
  readonly prompt: string;

  @IsString()
  @IsOptional()
  readonly originalImage?: string;

  @IsString()
  @IsOptional()
  readonly maskIamge?: string;
}
