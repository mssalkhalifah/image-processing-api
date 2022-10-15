import { isNumber, isInteger } from '../../utils/mathUtil';

describe('Math utility functions', (): void => {
  describe('check for valid numaric input', (): void => {
    it('should return true if input is number', (): void => {
      expect<boolean>(isNumber('12345')).toBeTrue();
    });

    it('should return true if input is integer', (): void => {
      expect<boolean>(isInteger('500')).toBeTrue();
    });

    it('should return false if input is not integer', (): void => {
      expect<boolean>(isInteger('12.5')).toBeFalse();
    });

    it('should return false if input is "12345Hello"', (): void => {
      expect<boolean>(isNumber('12345Hello')).toBeFalse();
    });

    it('should return false if input is an empty string', (): void => {
      expect<boolean>(isNumber('')).toBeFalse();
    });
  });
});
