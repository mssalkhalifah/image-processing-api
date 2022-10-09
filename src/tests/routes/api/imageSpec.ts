import request from 'supertest';
import app from '../../../index';

describe('GET /api/image', (): void => {
  it('should get status 200', async (): Promise<void> => {
    const response = await request(app).get('/api/image');
    expect<number>(response.statusCode).toEqual(200);
  });

  it('should respone with the same file as the filename quryed', async (): Promise<void> => {
    const filename = 'mountain';
    const respone = await request(app).get(`/api/image?filename=${filename}`);
    expect<string>(respone.text).toEqual(filename);
  });
});
