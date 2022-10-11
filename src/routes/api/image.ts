import express from 'express';
import path from 'path';
import fs from 'fs';
import sharp from 'sharp';

type QueryParams = {
  filename: string;
  width: string;
  height: string;
};

const router = express.Router();

router.get(
  '/image',
  async (req: express.Request<{}, {}, {}, QueryParams>, res): Promise<void> => {
    if (!req.query.filename) {
      res.sendStatus(400);
    } else {
      const url = path.join(
        global.publicRoot,
        'images',
        req.query.filename.concat('.jpg'),
      );

      if (req.query.width || req.query.height) {
        const imageBuffer = new Uint8Array(
          (await sharp(url).toBuffer()).buffer,
        );
        const imageMetadata = sharp(imageBuffer).metadata();

        const imageWidth: number = req.query.width
          ? parseInt(req.query.width, 10)
          : (await imageMetadata).width!;
        const imageHeight: number = req.query.height
          ? parseInt(req.query.height, 10)
          : (await imageMetadata).height!;

        const newFilename = req.query.filename.concat(
          imageWidth.toString(),
          imageHeight.toString(),
          '.jpg',
        );

        const filepath = path.resolve(global.publicRoot, 'thumb', newFilename);

        sharp(imageBuffer)
          .resize(imageWidth, imageHeight)
          .toFile(filepath)
          .then((): void => {
            res.status(200).sendFile(filepath);
          });
      } else {
        try {
          if (fs.existsSync(url)) {
            res.status(200).sendFile(url);
          } else {
            res.sendStatus(404);
          }
        } catch (err) {
          res.sendStatus(500);
        }
      }
    }
  },
);

export default router;
