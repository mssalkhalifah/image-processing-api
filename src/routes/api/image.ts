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
  async (
    req: express.Request<{}, {}, {}, QueryParams>,
    res: express.Response,
  ): Promise<void> => {
    if (!req.query.filename) {
      res.status(400).send({ message: 'Must atleast include a filename' });
    } else {
      const url = path.join(
        global.publicRoot,
        'images',
        req.query.filename.concat('.jpg'),
      );

      try {
        if (req.query.width || req.query.height) {
          sharp(url)
            .metadata()
            .then((metadata: sharp.Metadata): void => {
              let imageWidth: number = metadata.width!;
              let imageHeight: number = metadata.height!;

              if (req.query.width) {
                imageWidth = parseInt(req.query.width, 10);
              }

              if (req.query.height) {
                imageHeight = parseInt(req.query.height, 10);
              }

              const newFilename = req.query.filename.concat(
                imageWidth.toString(),
                imageHeight.toString(),
                '.jpg',
              );

              const filepath = path.resolve(
                global.publicRoot,
                'thumb',
                newFilename,
              );

              if (!fs.existsSync(path.resolve(global.publicRoot, 'thumb'))) {
                fs.mkdirSync(path.resolve(global.publicRoot, 'thumb'));
              }

              if (fs.existsSync(filepath)) {
                res.status(200).sendFile(filepath);
              } else {
                sharp(url)
                  .resize(imageWidth, imageHeight)
                  .toFile(filepath)
                  .then((): void => {
                    res.status(200).sendFile(filepath);
                  });
              }
            });
        } else if (fs.existsSync(url)) {
          res.status(200).sendFile(url);
        } else {
          res.sendStatus(404);
        }
      } catch (error) {
        res.sendStatus(500);
      }
    }
  },
);

export default router;
