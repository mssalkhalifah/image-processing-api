import express from 'express';
import path from 'path';
// import * as fs from 'fs';

type QueryParams = {
  filename: string;
  width: number;
  height: number;
};

const router = express.Router();

router.get(
  '/image',
  async (req: express.Request<{}, {}, {}, QueryParams>, res): Promise<void> => {
    const url = path.join(
      global.publicRoot,
      'images',
      req.query.filename.concat('.jpg'),
    );
    res.status(200).sendFile(url);
  },
);

export default router;
