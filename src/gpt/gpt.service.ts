import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { OrthographyDto } from './dtos/orthography.dto';
import { orthographyUseCase } from './uses-cases';

@Injectable()
export class GptService {
  private opeAi = new OpenAI({
    apiKey: process.env.OPENAI_AKI_KEY,
  });

  async orthographyCheck(body: OrthographyDto) {
    return await orthographyUseCase(this.opeAi, {
      prompt: body.req,
    });
  }
}
