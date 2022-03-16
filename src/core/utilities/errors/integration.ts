import { CustomError } from 'ts-custom-error';

export default class IntegrationError extends CustomError {
  isIntegrationError = true;
}
