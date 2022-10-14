import fs from 'fs';
import path from 'path';
import ErrorException from '../../errors/errorException';
import ImageService from '../../services/imageService';

describe('Image processing service', (): void => {
  const filename = 'cat';

  it('should not generate a file in thumb if no extra parameters were provided', async (): Promise<void> => {
    await ImageService.getImage(filename);

    const imageUrl = path.resolve(
      global.publicRoot,
      'thumb',
      filename.concat('.', 'jpg'),
    );

    expect<boolean>(fs.existsSync(imageUrl)).toBeFalse();
  });

  it('should generate a file in thumb if extra parameters were provided', async (): Promise<void> => {
    const image = await ImageService.getImage(filename, 400, 400);

    expect<boolean>(fs.existsSync(image)).toBeTrue();
  });

  it('should throw an exception if file does not exist', async (): Promise<void> => {
    const testFilename = 'sfdhu7h4huidsfa32';
    const expectedErrorMessage = `File name ${testFilename} not found`;

    let errorMessage = 'No error thrown.';
    try {
      await ImageService.getImage(testFilename);
    } catch (error) {
      const serviceError = error as ErrorException;
      errorMessage = serviceError.message;
    }

    expect(errorMessage).toBe(expectedErrorMessage);
  });

  describe('test width and height input', (): void => {
    const expectedErrorMessage = 'Width or height must be larger than 0';
    let errorMessage: string;

    beforeEach((): void => {
      errorMessage = 'No error thrown.';
    });

    it('should throw an exception if width is less than 0', async (): Promise<void> => {
      try {
        await ImageService.getImage(filename, -1);
      } catch (error) {
        const serviceError = error as ErrorException;
        errorMessage = serviceError.message;
      }

      expect(errorMessage).toBe(expectedErrorMessage);
    });

    it('should throw an exception if height equals 0', async (): Promise<void> => {
      try {
        await ImageService.getImage(filename, 500, 0);
      } catch (error) {
        const serviceError = error as ErrorException;
        errorMessage = serviceError.message;
      }

      expect(errorMessage).toBe(expectedErrorMessage);
    });
  });
});
