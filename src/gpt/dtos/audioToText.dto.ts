import { IsAlphanumeric, IsString } from 'class-validator';

export class AudioToTextDto {
  @IsString()
  readonly prompt: string;

  @IsAlphanumeric()
  readonly audio: any;
}
