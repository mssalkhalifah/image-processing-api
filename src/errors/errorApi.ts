import ErrorCodes from './errorCodes';
import ErrorException from './errorException';

export default class ApiError {
  static missingParameter(message: string): ErrorException {
    return new ErrorException(ErrorCodes.BAD_REQUEST, message);
  }

  static invalidParameterType(message: string): ErrorException {
    return new ErrorException(ErrorCodes.BAD_REQUEST, message);
  }
}
