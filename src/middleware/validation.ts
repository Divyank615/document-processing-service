import { Request, Response, NextFunction } from 'express';

export const validateUploadRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { filename, content, fileType } = req.body;

  if (!filename || !content || !fileType) {
    return res.status(400).json({
      error: 'filename, content and fileType are required',
    });
  }

  next();
};
