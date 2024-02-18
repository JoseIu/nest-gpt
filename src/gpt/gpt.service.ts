import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { OrthographyDto } from './dtos/orthography.dto';
import { ProsConsDiscusserDto } from './dtos/prosConsDiscusser.dto';
import { TranslateDto } from './dtos/translate.dto';
import {
  orthographyUseCase,
  prosConsDicusserStreamUseCase,
  prosConsDicusserUseCase,
  translateUseCase,
} from './uses-cases';

@Injectable()
export class GptService {
  private opeAi = new OpenAI({
    apiKey: process.env.OPENAI_AKI_KEY,
  });

  async orthographyCheck(body: OrthographyDto) {
    return await orthographyUseCase(this.opeAi, {
      prompt: body.prompt,
    });
  }

  async prosConsDiscusser({ prompt }: ProsConsDiscusserDto) {
    return await prosConsDicusserUseCase(this.opeAi, {
      prompt,
    });
  }

  async prosConsDiscusserStream({ prompt }: ProsConsDiscusserDto) {
    return await prosConsDicusserStreamUseCase(this.opeAi, {
      prompt,
    });
  }

  async translate({ prompt, lang }: TranslateDto) {
    return await translateUseCase(this.opeAi, { prompt, lang });
  }
}
