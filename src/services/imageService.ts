import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import ErrorService from '../errors/errorService';

export default class ImageService {
  // eslint-disable-next-line @typescript-eslint/typedef
  static getImage = async (
    filename: string,
    width?: number,
    height?: number,
  ): Promise<string> => {
    let result: string;

    const fileUrl = path.resolve(
      global.publicRoot,
      'images',
      filename.concat('.', 'jpg'),
    );

    if (!fs.existsSync(fileUrl)) {
      throw ErrorService.fileNotFound(`File name ${filename} not found`);
    }

    result = fileUrl;

    let imageWidth: number;
    let imageHeight: number;
    let thumbFilepath: string;

    if (width !== undefined || height !== undefined) {
      if (
        // eslint-disable-next-line operator-linebreak
        (width !== undefined && width <= 0) ||
        (height !== undefined && height <= 0)
      ) {
        throw ErrorService.invalidInput(
          'Width or height must be larger than 0',
        );
      }

      imageWidth = width || (await sharp(fileUrl).metadata()).width!;
      imageHeight = height || (await sharp(fileUrl).metadata()).height!;

      const newFilename = filename.concat(
        imageWidth.toString(),
        imageHeight.toString(),
        '.',
        'jpg',
      );

      thumbFilepath = path.resolve(global.publicRoot, 'thumb', newFilename);

      if (!fs.existsSync(path.resolve(global.publicRoot, 'thumb'))) {
        fs.mkdirSync(path.resolve(global.publicRoot, 'thumb'));
      }

      if (!fs.existsSync(thumbFilepath)) {
        await sharp(fileUrl)
          .resize(imageWidth, imageHeight)
          .toFile(thumbFilepath);
      }

      result = thumbFilepath;
    }
    return result;
  };
}
