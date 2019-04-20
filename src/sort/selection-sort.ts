import { swap } from '../lib/swap';
import { CompareFunc, isLess } from '../lib/comparators';

/*
  Characteristics:
    - in-place
    - time complexity:
        worst: O(n^2) comparisons | O(n) swaps
        best: O(n^2) comparisons | O(n) swaps
        average: O(n^2) comparisons | O(n) swaps
    - space complexity: O(1)
*/

export const createSorter = <T>(compare: CompareFunc<T>) => (sortable: T[]) => {
  const length = sortable.length;

  for (let i = 0; i < length; i++) {
    let min = i;
    for (let j = i + 1; j < length; j++) {
      if (compare(sortable[j], sortable[min])) {
        min = j;
      }
    }
    swap(sortable, i, min);
  }

  return sortable;
};

export const sort = createSorter(isLess);
