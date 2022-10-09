import request from 'supertest';
import app from '../../../index';

describe('GET /api/image', (): void => {
  it('should return a string', async (): Promise<void> => {
    const response = await request(app).get('/api/image');
    // expect<number>(response.statusCode).toEqual(205);
    expect<string>(response.text).toEqual("Here's the image from image api");
  });
});
