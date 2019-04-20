import { SortFunc, CreateSorterFunc } from '../sort/types';
import { CompareFunc } from './comparators';

export function testDefaultCases(sorter: SortFunc<number>) {
  it('should "sort" an empty array', () => {
    expect(sorter([])).toEqual([]);
  });

  it('should "sort" an array with single element', () => {
    expect(sorter([1])).toEqual([1]);
  });

  it('should sort an array with duplicates', () => {
    const arr = [2, 5, 0, 0, 0, -4, 1000, -300];

    expect(sorter(arr)).toEqual([-300, -4, 0, 0, 0, 2, 5, 1000]);
  });
}

export function testCustomComparator<T>(sortFunc: SortFunc<T>, comparable: T[], expected: T[]) {
  it('should sort with custom compare function', () => {
    expect(sortFunc(comparable)).toEqual(expected);
  });
}
