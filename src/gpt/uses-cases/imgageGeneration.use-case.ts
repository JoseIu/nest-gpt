import OpenAI from 'openai';
import { downLoadImageAsPng } from '../helpers';

interface Options {
  prompt: string;
  originalImage?: string;
  maskIamge?: string;
}

export const imgaGenerationUseCase = async (openai: OpenAI, options: Options) => {
  const { prompt, originalImage, maskIamge } = options;

  // TODO: Verificar original iamge

  const response = await openai.images.generate({
    model: 'dall-e-2',
    prompt: prompt,
    n: 1,
    size: '1024x1024',
    quality: 'standard',
    response_format: 'url',
  });

  // Guardar la imagen en FS
  const imageUrl = await downLoadImageAsPng(response.data[0].url);

  console.log(response);

  return { url: imageUrl, urlOpenAi: response.data[0].url, revised_prompt: response.data[0].revised_prompt };
};
