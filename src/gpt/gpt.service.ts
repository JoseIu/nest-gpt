import { Injectable, NotFoundException } from '@nestjs/common';
import * as fs from 'fs';
import OpenAI from 'openai';
import * as path from 'path';
import { AudioToTextDto } from './dtos/audioToText.dto';
import { imageGenerationDto } from './dtos/imageGeneration.dto';
import { OrthographyDto } from './dtos/orthography.dto';
import { ProsConsDiscusserDto } from './dtos/prosConsDiscusser.dto';
import { TextToAudioDto } from './dtos/textToAudio.dto';
import { TranslateDto } from './dtos/translate.dto';
import {
  audioToTextUseCase,
  imgaGenerationUseCase,
  orthographyUseCase,
  prosConsDicusserStreamUseCase,
  prosConsDicusserUseCase,
  textToAudioUseCase,
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

  async textToAudio({ prompt, voice }: TextToAudioDto) {
    return await textToAudioUseCase(this.opeAi, { prompt, voice });
  }

  async getTextToAudio(fileId: string) {
    const filePath = path.resolve(__dirname, '../../generated/audios/', `${fileId}.mp3`);

    const fileFound = fs.existsSync(filePath);

    if (!fileFound) new NotFoundException(`Audio ${fileId} no encontrado`);

    return filePath;
  }

  async audioToTex(audioFIle: Express.Multer.File, audioToTextDto?: AudioToTextDto) {
    const { prompt } = audioToTextDto;
    return audioToTextUseCase(this.opeAi, { audioFIle, prompt });
  }

  async imageGeneration(imageGenerationPromot: imageGenerationDto) {
    return imgaGenerationUseCase(this.opeAi, imageGenerationPromot);
  }
}
