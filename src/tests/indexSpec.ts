import returnsHelloWorld from '../index';

describe('A main index hello world funtion', () => {
  const helloWorld = returnsHelloWorld();
  it('should return a string', () => {
    expect(helloWorld).toBeInstanceOf(String);
  });
  it('should return a Hello World string', () => {
    expect(helloWorld).toEqual('Hello World');
  });
});
