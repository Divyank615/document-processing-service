import { Request, Response, NextFunction } from 'express';

const isBase64 = (str: string): boolean => {
  try {
    return Buffer.from(str, 'base64').toString('base64') === str;
  } catch {
    return false;
  }
};

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

  if (!isBase64(content)) {
    return res.status(400).json({
      error: 'Invalid base64 content',
    });
  }

  next();
};
