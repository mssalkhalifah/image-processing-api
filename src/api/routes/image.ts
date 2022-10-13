import express from 'express';
import ImageService from '../../services/imageService';

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
      const result = await new ImageService().getImage(
        req.query.filename,
        parseInt(req.query.width, 10),
        parseInt(req.query.height, 10),
      );

      if (!result.imageUrl) {
        res.status(404).send(result.error);
      } else {
        res.status(200).sendFile(result.imageUrl);
      }
    }
  },
);

export default router;
