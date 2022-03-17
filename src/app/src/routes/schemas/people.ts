import { Schema } from 'express-validator';

const getPeople: Schema = {
  page: {
    in: 'query',
    isNumeric: true,
    errorMessage: 'invalid_page',
  },
};

export default getPeople;
