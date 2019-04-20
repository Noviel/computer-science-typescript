import { testDefaultCases, testCustomComparator } from '../lib/test-utils';

import { sort, createSorter } from './selection-sort';

describe('Insertion sort', () => {
  testDefaultCases(sort);
  testCustomComparator(createSorter((a, b) => a.value < b.value), [
    { value: 0 },
    { value: 2 },
    { value: -2 },
  ]);
});
