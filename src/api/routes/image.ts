import express, { NextFunction } from 'express';
import ApiError from '../../errors/errorApi';
import ImageService from '../../services/imageService';
import { isInteger } from '../../utils/mathUtil';

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
    next: NextFunction,
  ): Promise<void> => {
    if (!req.query.filename) {
      next(
        ApiError.missingParameter('Must atleast include filename paramater.'),
      );
    } else {
      try {
        let width: number | undefined;
        let height: number | undefined;

        if (req.query.width) {
          width = parseInt(req.query.width, 10);
        }

        if (req.query.height) {
          height = parseInt(req.query.height, 10);
        }

        if (
          // eslint-disable-next-line operator-linebreak
          (req.query.width && !isInteger(req.query.width)) ||
          (req.query.height && !isInteger(req.query.height))
        ) {
          throw ApiError.invalidParameterType(
            'Width and height must be integer',
          );
        }

        const result = await ImageService.getImage(
          req.query.filename,
          width,
          height,
        );

        res.status(200).sendFile(result);
      } catch (error) {
        next(error);
      }
    }
  },
);

export default router;
