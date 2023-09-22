import { Logger } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

export function logger(req: Request, res: Response, next: NextFunction) {
  const logger = new Logger();
  const start = Date.now();
  const { method, originalUrl } = req;

  res.on('finish', () => {
    const end = Date.now();
    const elapsed = end - start;
    logger.log(`Mapped {${originalUrl}, ${method}} route +${elapsed}ms`);
  });
  next();
}
