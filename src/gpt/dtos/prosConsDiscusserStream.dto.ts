import { IsString } from 'class-validator';

export class ProsConsDiscusserStreamerDto {
  @IsString()
  readonly prompt: string;
}
