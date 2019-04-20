import { fibPolynomial, fibRecursive } from './fibonacci';

describe('Recursive Fibonacci sequence algorithm', () => {
  it('should generate Fibonacci number', () => {
    expect(fibRecursive(10)).toEqual(55);
  });
});

describe('Polynomial Fibonacci sequence algorithm', () => {
  it('should generate Fibonacci number', () => {
    expect(fibPolynomial(50)).toEqual(12586269025);
  });
});
