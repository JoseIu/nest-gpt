import * as fs from 'fs';
import OpenAI from 'openai';
import { downLoadImageAsPng } from '../helpers';

interface Options {
  baseImage: string;
}

export const imageVariationUseCase = async (opeAi: OpenAI, options: Options) => {
  const { baseImage } = options;

  const pngIamge = await downLoadImageAsPng(baseImage, true);
  const response = await opeAi.images.createVariation({
    image: fs.createReadStream(pngIamge),
    n: 1,
    size: '1024x1024',
  });

  const newImage = await downLoadImageAsPng(response.data[0].url);

  const publicUrl = `${process.env.SERVER_URL}/gpt/image-generation/${newImage}`;

  return {
    url: publicUrl,
    urlOpenAi: response.data[0].url,
    revised_prompt: response.data[0].revised_prompt,
  };
};
