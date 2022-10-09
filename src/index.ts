import * as dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import * as imagesRoute from './routes/api/image';

dotenv.config();
global.publicRoot = path.resolve(__dirname, '..', 'public');

const app = express();

app.use('/api', imagesRoute.default);

app.get('/', (req, res): void => {
  res.send('Hello World');
});

app.listen(process.env.PORT, (): void => {
  // eslint-disable-next-line no-console
  console.log(`server started at http://localhost:${process.env.PORT}`);
});

export default app;
