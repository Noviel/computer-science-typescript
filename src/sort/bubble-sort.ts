import { swap } from '../lib/swap';
import { isGreater, CompareFunc } from '../lib/comparators';

import { SortFunc } from './types';

/*
  Characteristics:
    - in-place
    - time complexity:
        worst: O(n^2)
        best: O(n)
        average: O(n^2)
    - space complexity: O(1)
*/

export const createSorter = <T>(compare: CompareFunc<T>): SortFunc<T> => (sortable: T[]) => {
  const length = sortable.length;
  let swapped: boolean;
  do {
    swapped = false;
    for (let i = 1; i < length; i++) {
      if (compare(sortable[i - 1], sortable[i])) {
        swap(sortable, i - 1, i);
        swapped = true;
      }
    }
  } while (swapped);

  return sortable;
};

export const sort = createSorter(isGreater);
