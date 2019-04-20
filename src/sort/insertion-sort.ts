import { swap } from '../lib/swap';
import { CompareFunc, isLess } from '../lib/comparators';

/*
  Characteristics:
    - in-place
    - time complexity:
        worst: O(n^2) comparisons | O(n^2) swaps
        best O(n) comparisons | O(1) swaps
        average O(n^2) comparisons | O(n^2) swaps
    - space complexity: O(n)
*/

export const createSorter = <T>(compare: CompareFunc<T>) => (sortable: T[]) => {
  const length = sortable.length;

  for (let i = 1; i < length; i++) {
    for (let j = i; j > 0 && compare(sortable[j], sortable[j - 1]); j--) {
      swap(sortable, j, j - 1);
    }
  }

  return sortable;
};

export const sort = createSorter(isLess);
