import * as dotenv from 'dotenv';
import express from 'express';

dotenv.config();

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`server started at http://localhost:${process.env.PORT}`);
});
