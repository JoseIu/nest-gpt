import { Body, Controller, Post } from '@nestjs/common';
import { OrthographyDto } from './dtos/orthography.dto';
import { GptService } from './gpt.service';

@Controller('gpt')
export class GptController {
  constructor(private readonly gptService: GptService) {}

  @Post('orthography')
  orthographyCheck(@Body() body: OrthographyDto) {
    return this.gptService.orthographyCheck(body);
  }
}
