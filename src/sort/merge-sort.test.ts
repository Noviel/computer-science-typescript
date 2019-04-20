import { testDefaultCases, testCustomComparator } from '../lib/test-utils';

import { sort, bottomUpSort, createSorter } from './merge-sort';

describe('Merge sort', () => {
  testDefaultCases(sort);
  testCustomComparator(
    createSorter((a, b) => a.value < b.value),
    [{ value: 0 }, { value: 2 }, { value: -2 }],
    [{ value: -2 }, { value: 0 }, { value: 2 }]
  );
});

describe('Merge bottom-up sort', () => {
  testDefaultCases(bottomUpSort);
  testCustomComparator(
    createSorter((a, b) => a.value < b.value),
    [{ value: 0 }, { value: 2 }, { value: -2 }],
    [{ value: -2 }, { value: 0 }, { value: 2 }]
  );
});
