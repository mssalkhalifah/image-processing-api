import * as dotenv from 'dotenv';
import express from 'express';
import * as imagesRoute from './routes/api/image';

dotenv.config();

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
