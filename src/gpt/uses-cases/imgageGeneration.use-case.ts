import * as fs from 'fs';
import OpenAI from 'openai';
import { downLoadImageAsPng, downloadBase64ImageAsPng } from '../helpers';

interface Options {
  prompt: string;
  originalImage?: string;
  maskIamge?: string;
}

export const imgaGenerationUseCase = async (openai: OpenAI, options: Options) => {
  const { prompt, originalImage, maskIamge } = options;

  //Si solo queremos generar una imagen
  if (!originalImage || !maskIamge) {
    const response = await openai.images.generate({
      model: 'dall-e-3',
      prompt: prompt,
      n: 1,
      size: '1024x1024',
      quality: 'standard',
      response_format: 'url',
    });

    // Guardar la imagen en FS
    const imageName = await downLoadImageAsPng(response.data[0].url);

    const publicUrl = `${process.env.SERVER_URL}/gpt/image-generation/${imageName}`;

    console.log(response);

    return {
      url: publicUrl,
      urlOpenAi: response.data[0].url,
      revised_prompt: response.data[0].revised_prompt,
    };
  }

  //imagen a editar, se podría verificar si ya existe la imagen
  const pngImagePath = await downLoadImageAsPng(originalImage, true);

  const maskPath = await downloadBase64ImageAsPng(maskIamge, true);

  const response = await openai.images.edit({
    model: 'dall-e-2',
    prompt: prompt,
    image: fs.createReadStream(pngImagePath),
    mask: fs.createReadStream(maskPath),
    n: 1,
    response_format: 'url',
  });

  const imageName = await downLoadImageAsPng(response.data[0].url);
  const publicUrl = `${process.env.SERVER_URL}/gpt/image-generation/${imageName}`;

  return {
    url: publicUrl,
    urlOpenAi: response.data[0].url,
    revised_prompt: response.data[0].revised_prompt,
  };
};
