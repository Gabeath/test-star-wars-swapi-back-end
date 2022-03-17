import express, { Request, Response } from 'express';
import httpStatus from 'http-status';
import { checkSchema, validationResult } from 'express-validator';

import UserService from '@app/services/user';
import createUser from '@app/routes/schemas/user';

import errorHandler from '@middlewares/error-handler';

import BusinessError, { ValidationCodeError } from '@utilities/errors/business';

const routes = express.Router();

routes.post(
  '/',
  checkSchema(createUser),
  async (req: Request, res: Response) => {
    let response;
    try {
      validationResult(req).throw();
      response = await UserService.create(req.body);
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
