import * as fs from 'fs';
import OpenAI from 'openai';

interface Options {
  prompt: string;
  audioFIle: Express.Multer.File;
}

export const audioToTextUseCase = async (openAi: OpenAI, options: Options) => {
  const { prompt, audioFIle } = options;

  const response = await openAi.audio.transcriptions.create({
    model: 'whisper-1',
    file: fs.createReadStream(audioFIle.path),
    prompt: prompt, //Mismo idioma que el audio
    language: 'es',
    response_format: 'verbose_json',
  });

  return response;
};
