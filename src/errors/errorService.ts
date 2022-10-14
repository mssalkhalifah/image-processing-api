import ErrorCodes from './errorCodes';
import ErrorException from './errorException';

export default class ErrorService {
  static fileNotFound(message: string): ErrorException {
    return new ErrorException(ErrorCodes.NOT_FOUND, message);
  }

  static invalidInput(message: string): ErrorException {
    return new ErrorException(ErrorCodes.BAD_REQUEST, message);
  }
}
