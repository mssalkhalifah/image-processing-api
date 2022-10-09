import express from 'express';
// import * as fs from 'fs';

const router = express.Router();

router.get('/image', async (req, res): Promise<void> => {
  res.status(200).send("Here's the image from image api");
});

export default router;
