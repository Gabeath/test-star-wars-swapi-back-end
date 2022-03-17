import { Schema } from 'express-validator';

const createUser: Schema = {
  name: {
    in: 'body',
    isString: true,
    errorMessage: 'invalid_name',
  },
  email: {
    in: 'body',
    isEmail: true,
    errorMessage: 'invalid_email',
  },
  phone: {
    in: 'body',
    isString: true,
    isMobilePhone: true,
    isLength: {
      options: {
        max: 11,
        min: 11,
      },
    },
    errorMessage: 'invalid_phone',
  },
  password: {
    in: 'body',
    isString: true,
    errorMessage: 'invalid_password',
  },
};

export default createUser;
