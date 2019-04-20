import { isLess, CompareFunc } from '../lib/comparators';
import { swap } from '../lib/swap';

/*
  Characteristics:
    - in-place
    - time complexity:
        worst: O(n log n)
        best: O(n log n)
        average: O(n log n)
    - space complexity: O(n)
*/

interface Options {
  bottomUp: boolean;
}

export const createSorter = <T>(
  compare: CompareFunc<T>,
  { bottomUp = false }: Options = { bottomUp: false }
) => {
  function partition(comparable: T[], lo: number, hi: number) {
    let i = lo;
    let j = hi + 1;

    while (true) {
      while (compare(comparable[++i], comparable[lo])) {
        if (i === hi) {
          break;
        }
      }
      while (compare(comparable[lo], comparable[--j])) {
        if (j === lo) {
          break;
        }
      }
      if (i >= j) {
        break;
      }

      swap(comparable, i, j);
    }
    swap(comparable, lo, j);

    return j;
  }

  function innerSort(sortable: T[], lo: number, hi: number) {
    if (hi <= lo) {
      return sortable;
    }
    let j = partition(sortable, lo, hi);
    innerSort(sortable, lo, j - 1);
    innerSort(sortable, j + 1, hi);

    return sortable;
  }

  function sort(sortable: T[]) {
    innerSort(sortable, 0, sortable.length - 1);

    return sortable;
  }

  return sort;
};

export const sort = createSorter(isLess);
export const bottomUpSort = createSorter(isLess, { bottomUp: true });
