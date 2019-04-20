export function fibRecursive(n: number): number {
  if (n <= 1) {
    return n;
  }
  return fibRecursive(n - 1) + fibRecursive(n - 2);
}

export function fibPolynomial(n: number): number {
  if (n <= 1) {
    return n;
  }

  const memo: number[] = new Array(n);
  memo[0] = 0;
  memo[1] = 1;

  for (let i = 2; i < n; i++) {
    memo[i] = memo[i - 1] + memo[i - 2];
  }

  return memo[n];
}
