import express, { Request, Response } from 'express';
import httpStatus from 'http-status';
import { checkSchema, validationResult } from 'express-validator';

import LoginService from '@app/services/login';
import authenticateUser from '@app/routes/schemas/login';

import errorHandler from '@middlewares/error-handler';

import BusinessError, { ValidationCodeError } from '@utilities/errors/business';

const routes = express.Router();

routes.post(
  '/',
  checkSchema(authenticateUser),
  async (req: Request, res: Response) => {
    let response;
    try {
      validationResult(req).throw();
      response = await LoginService.auth(req.body);
    } catch (err) {
      const errCatch = err?.errors?.length
        ? new BusinessError(ValidationCodeError.INVALID_PARAMS, {
          message: err.errors.shift().msg,
        }) : err;

      return errorHandler(errCatch, req, res);
    }
    return res.status(httpStatus.OK).json(response);
  },
);

export default routes;
