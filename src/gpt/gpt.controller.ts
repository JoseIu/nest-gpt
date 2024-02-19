import { Body, Controller, Get, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { AudioToTextDto } from './dtos/audioToText.dto';
import { OrthographyDto } from './dtos/orthography.dto';
import { ProsConsDiscusserDto } from './dtos/prosConsDiscusser.dto';
import { TextToAudioDto } from './dtos/textToAudio.dto';
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

  @Post('text-to-audio')
  async textToAudio(@Body() body: TextToAudioDto, @Res() res: Response) {
    const filePath = await this.gptService.textToAudio(body);

    res.setHeader('Content-Type', 'audio/mp3');

    res.status(HttpStatus.OK);

    res.sendFile(filePath);
  }

  @Get('text-to-audio/:fileId')
  async getTextToAudio(@Res() res: Response, @Param('fileId') fileId: string) {
    const filePath = await this.gptService.getTextToAudio(fileId);

    res.setHeader('Content-Type', 'audio/mp3');
    res.status(HttpStatus.OK);

    res.sendFile(filePath);
  }

  @Post('audio-to-text')
  audioToText(@Body() body: AudioToTextDto) {
    return this.gptService.audioToTex(body);
  }
}
