import * as dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import * as imagesRoute from './routes/api/image';

dotenv.config();
global.publicRoot = path.resolve(__dirname, '..', 'public');

const port = 5555;
const app = express();

app.use('/api', imagesRoute.default);

app.get('/', (req: express.Request, res: express.Response): void => {
  res.send('Hello World');
});

app.listen(port, (): void => {
  // eslint-disable-next-line no-console
  console.log(`server started at http://localhost:${port}`);
});

export default app;
