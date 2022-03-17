import { Schema } from 'express-validator';

const authenticateUser: Schema = {
  email: {
    in: 'body',
    isEmail: true,
    errorMessage: 'invalid_email',
  },
  password: {
    in: 'body',
    isString: true,
    errorMessage: 'invalid_password',
  },
};

export default authenticateUser;
