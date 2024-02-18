import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { OrthographyDto } from './dtos/orthography.dto';
import { ProsConsDiscusserDto } from './dtos/prosConsDiscusser.dto';
import { TranslateDto } from './dtos/translate.dto';
import { GptService } from './gpt.service';

@Controller('gpt')
export class GptController {
  constructor(private readonly gptService: GptService) {}

  @Post('orthography')
  orthographyCheck(@Body() body: OrthographyDto) {
    return this.gptService.orthographyCheck(body);
  }

  @Post('pros-cons-discusser')
  prosConsDiscusser(@Body() body: ProsConsDiscusserDto) {
    return this.gptService.prosConsDiscusser(body);
  }

  @Post('pros-cons-discusser-stream')
  async prosConsDicusserStream(@Body() Body: ProsConsDiscusserDto, @Res() res: Response) {
    const stream = await this.gptService.prosConsDiscusserStream(Body);

    res.setHeader('Content-Type', 'application/json');
    res.status(HttpStatus.OK);

    for await (const chunk of stream) {
      const piece = chunk.choices[0].delta.content || '';
      // console.log(piece);
      res.write(piece);
    }

    res.end();
  }

  @Post('translate')
  translate(@Body() body: TranslateDto) {
    return this.gptService.translate(body);
  }
}
