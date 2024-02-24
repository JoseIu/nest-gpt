import {
  Body,
  Controller,
  FileTypeValidator,
  Get,
  HttpStatus,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { AudioToTextDto } from './dtos/audioToText.dto';
import { imageGenerationDto } from './dtos/imageGeneration.dto';
import { imageVariationDto } from './dtos/imageVariation.dto';
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
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './generated/uploads',
        filename: (req, file, callback) => {
          const fileExtension = file.originalname.split('.').pop();

          const fileName = `${uuidv4()}.${fileExtension}`;

          return callback(null, fileName);
        },
      }),
    }),
  )
  async audioToText(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1000 * 1024 * 5, message: 'El audio no puede ser mayor a 5 mb' }),
          new FileTypeValidator({ fileType: 'audio/*' }),
        ],
      }),
    )
    file: Express.Multer.File,

    @Body() audioToTextDto: AudioToTextDto,
  ) {
    return this.gptService.audioToTex(file, audioToTextDto);
  }

  @Post('image-generation')
  async imageGeneration(@Body() imageGenerationPromot: imageGenerationDto) {
    return await this.gptService.imageGeneration(imageGenerationPromot);
  }

  @Get('image-generation/:imageId')
  async getIamge(@Res() res: Response, @Param('imageId') imageId: string) {
    const imageIdPath = this.gptService.getIamge(imageId);

    res.status(HttpStatus.OK);

    res.sendFile(imageIdPath);
  }

  @Post('image-variation')
  async imageVariation(@Body() baseImage: imageVariationDto) {
    return await this.gptService.imageVariation(baseImage);
  }
}
