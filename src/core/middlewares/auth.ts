import { NextFunction, Request, Response } from 'express';

import errorHandler from '@middlewares/error-handler';

import UnauthorizedError from '@utilities/errors/unauthorized';
import { verifyToken } from '@utilities/utils';

/**
 * Middleware to authenticate user using jwt token
 *
 * @export
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @param {Express.Next} next
 * @returns void
 */
const auth = () => async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.headers || !req.headers.authorization) {
      throw new UnauthorizedError();
    }

    let token = null;
    const parts = req.headers.authorization.split(' ');
    if (parts.length === 2 && /^Bearer$/i.test(parts[0])) {
      [, token] = parts;
    }

    if (!token) {
      throw new UnauthorizedError();
    }

    let payload;
    try {
      payload = verifyToken(token) as { userId: string };
    } catch (err) {
      throw new UnauthorizedError();
    }

    if (!payload) {
      throw new UnauthorizedError();
    }

    req.session = {
      userId: payload.userId,
    };

    return next();
  } catch (err) {
    return errorHandler(err, req, res);
  }
};

export default auth;
