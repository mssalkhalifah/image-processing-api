import request from 'supertest';
// import sh from 'sharp';
import app from '../../../index';

describe('GET /api/image', (): void => {
  const filename = 'mountain';

  it('should get status 200 if request succeeded', async (): Promise<void> => {
    const response = await request(app).get(`/api/image?filename=${filename}`);
    expect<number>(response.statusCode).toEqual(200);
  });

  it('should get status 404 if file not found', async (): Promise<void> => {
    const response = await request(app).get(
      '/api/image?filename=impossibleImage',
    );
    expect<number>(response.statusCode).toEqual(404);
  });
  // it('should respone with the same file as the filename quryed', async (): Promise<void> => {
  //   const respone = await request(app).get(`/api/image?filename=${filename}`);
  //   const responseImage = new Uint32Array(
  //     (await sh(respone.body).raw().toBuffer()).buffer,
  //   );
  //   // for (var i = 0; i < responseImage.length; i++) {}
  //   expect<number>(responseImage.length).toEqual(10);
  // });
});
