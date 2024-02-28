import { Body, Controller, Post } from '@nestjs/common';
import { UserQuestionDto } from './dtos/userQuestion.dto';
import { SamAssistantService } from './sam-assistant.service';

@Controller('gpt')
export class SamAssistantController {
  constructor(private readonly samAssistantService: SamAssistantService) {}

  @Post('create-thread')
  async creatThread() {
    return this.samAssistantService.creatThread();
  }

  @Post('user-question')
  async userCuestion(@Body() body: UserQuestionDto) {
    return await this.samAssistantService.createMessage(body);
  }
}
