import fs from 'fs';
import path from 'path';
import ImageService from '../../services/imageService';

describe('Image processing service', (): void => {
  const filename = 'cat';
  const service = new ImageService();

  afterAll((): void => {
    const dir = path.resolve(global.publicRoot, 'thumb');
    const files = fs.readdirSync(dir);

    /**
     * Delete all images that are used for tests
     */
    for (let i = 0; i < files.length; i += 1) {
      fs.unlinkSync(path.join(dir, files[i]));
    }
  });

  it('should not generate a file in thumb if no extra parameters were provided', async (): Promise<void> => {
    await service.getImage(filename);
    const thumbFileCount = fs.readdirSync(
      path.resolve(global.publicRoot, 'thumb'),
    ).length;

    expect<number>(thumbFileCount).toBeFalsy();
  });

  it('should generate a file in thumb if extra parameters were provided', async (): Promise<void> => {
    const image = await service.getImage(filename, 400, 400);

    expect<boolean>(fs.existsSync(image.imageUrl!)).toBeTrue();
  });
});
