import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

export default class ImageService {
  // eslint-disable-next-line @typescript-eslint/typedef
  getImage = async (
    filename: string,
    width?: number,
    height?: number,
  ): Promise<{ [imageUrl: string]: string | null }> => {
    const result: { [imageUrl: string]: string | null } = {
      imageUrl: null,
      error: null,
    };

    const fileUrl = path.resolve(
      global.publicRoot,
      'images',
      filename.concat('.', 'jpg'),
    );

    if (!fs.existsSync(fileUrl)) {
      result.error = 'image does not exist';
      return result;
    }

    result.imageUrl = fileUrl;

    let imageWidth: number;
    let imageHeight: number;
    let thumbFilepath: string;

    if (width || height) {
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

      result.imageUrl = thumbFilepath;
    }
    return result;
  };
}
