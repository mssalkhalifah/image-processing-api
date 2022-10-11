import request from 'supertest';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import app from '../../../index';

describe('GET /api/image', (): void => {
  const filename = 'milkyway';

  it('should respone with status 200 if request succeeded', async (): Promise<void> => {
    const response = await request(app).get(`/api/image?filename=${filename}`);
    expect<number>(response.statusCode).toEqual(200);
  });

  it('should respone with status 404 if file not found', async (): Promise<void> => {
    const response = await request(app).get(
      '/api/image?filename=impossibleImage',
    );
    expect<number>(response.statusCode).toEqual(404);
  });

  it('should respone with status 400 if no parameter was provided', async (): Promise<void> => {
    const response = await request(app).get('/api/image');
    expect<number>(response.statusCode).toEqual(400);
  });

  it('should respone with the same image requested', async (): Promise<void> => {
    const response = await request(app).get(`/api/image?filename=${filename}`);
    const responeImage = new Uint8Array(
      (await sharp(response.body).toBuffer()).buffer,
    );
    const expectedImage = new Uint8Array(
      (
        await sharp(
          path.resolve(global.publicRoot, 'images', filename.concat('.jpg')),
        ).toBuffer()
      ).buffer,
    );

    let isSame = responeImage.length === expectedImage.length;
    if (isSame) {
      for (let i = 0; i < responeImage.length; i += 1) {
        if (responeImage[i] !== expectedImage[i]) {
          isSame = false;
          break;
        }
      }
    }

    expect<boolean>(isSame).toBeTrue();
  });

  describe('sharp generated image', (): void => {
    const width: number = 200;
    const height: number = 200;
    let response: request.Response;
    let responseImageMetadata: sharp.Metadata;

    beforeAll(async (): Promise<void> => {
      response = await request(app).get(
        `/api/image?filename=${filename}&width=${width}&height=${height}`,
      );
      responseImageMetadata = await sharp(response.body).metadata();
    });

    it('should respone with an image of the same height queried', (): void => {
      expect<number | undefined>(responseImageMetadata.height).toEqual(height);
    });

    it('should respone with an image of the same width queried', (): void => {
      expect<number | undefined>(responseImageMetadata.width).toEqual(width);
    });

    it(`should generate a file with the same name as ${filename}${width}${height}.jpg in thumb`, (): void => {
      expect<boolean>(
        fs.existsSync(
          path.resolve(
            global.publicRoot,
            'thumb',
            `${filename}${width}${height}.jpg`,
          ),
        ),
      ).toBeTrue();
    });
  });
});
