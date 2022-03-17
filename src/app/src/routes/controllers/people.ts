import express, { Request, Response } from 'express';
import httpStatus from 'http-status';
import { checkSchema, validationResult } from 'express-validator';

import PeopleService from '@app/services/people';
import getPeople from '@app/routes/schemas/people';

import auth from '@middlewares/auth';
import errorHandler from '@middlewares/error-handler';

import BusinessError, { ValidationCodeError } from '@utilities/errors/business';

const routes = express.Router();

routes.get(
  '/',
  auth(),
  checkSchema(getPeople),
  async (req: Request, res: Response) => {
    let response;
    try {
      validationResult(req).throw();
      const page = Number(req.query.page);
      response = await PeopleService.getPeople(page || 1);
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
