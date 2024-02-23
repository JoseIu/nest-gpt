import { InternalServerErrorException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as sharp from 'sharp';
import { v4 as uuidv4 } from 'uuid';

export const downLoadImageAsPng = async (url: string) => {
  const response = await fetch(url);

  if (!response.ok) throw new InternalServerErrorException('Error al obtener la imagen');

  const folderPath = path.resolve('./', './generated/images/');
  fs.mkdirSync(folderPath, { recursive: true });

  const imageNamePng = `${uuidv4()}.png`;

  const buffer = Buffer.from(await response.arrayBuffer());

  const completePath = path.join(folderPath, imageNamePng);

  //   fs.writeFileSync(`${folderPath}/${imageNamePng}`, buffer);

  await sharp(buffer).png().ensureAlpha().toFile(completePath);

  return completePath;
};
