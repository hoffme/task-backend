import { Response } from 'express';

const jsonResponse = (res: Response, status: number, result: unknown) => {
  res.status(status).json({ result });
};

const errorResponse = (res: Response, status: number, error: Error) => {
  res.status(status).json({ error: error.message });
};

export { jsonResponse, errorResponse };
