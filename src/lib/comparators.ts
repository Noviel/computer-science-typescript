export type CompareFunc<T> = (a: T, b: T) => boolean;

export function isGreater<T>(a: T, b: T): boolean {
  return a > b;
}

export function isLess<T>(a: T, b: T): boolean {
  return a < b;
}
