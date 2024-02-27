import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { UserQuestionDto } from './dtos/userQuestion.dto';
import {
  checkCompleteStatusUseCase,
  createMessageUseCase,
  createRunUseCase,
  createThreadUseCase,
  getMessagesUseCase,
} from './uses-cases';

@Injectable()
export class SamAssistantService {
  private opeAi = new OpenAI({
    apiKey: process.env.OPENAI_AKI_KEY,
  });

  async creatThread() {
    return await createThreadUseCase(this.opeAi);
  }

  async createMessage(options: UserQuestionDto) {
    const { threadId, question } = options;

    //Creamos el mensaje de la pregunta
    await createMessageUseCase(this.opeAi, { threadId, question });

    const run = await createRunUseCase(this.opeAi, { threadId });

    //Esperamos a que el status sea completed
    await checkCompleteStatusUseCase(this.opeAi, { runId: run.id, threadId });

    const messages = getMessagesUseCase(this.opeAi, { threadId });

    return messages;
  }
}
