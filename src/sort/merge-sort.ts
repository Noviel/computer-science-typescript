import { isLess, CompareFunc } from '../lib/comparators';

interface Options {
  bottomUp: boolean;
}

export const createSorter = <T>(
  compare: CompareFunc<T>,
  { bottomUp = false }: Options = { bottomUp: false }
) => {
  const createMerger = (compare: CompareFunc<T>) => (
    sortable: T[],
    aux: T[],
    lo: number,
    mid: number,
    hi: number
  ) => {
    for (let i = 0; i < sortable.length; i++) {
      aux[i] = sortable[i];
    }

    let i = lo;
    let j = mid + 1;

    for (let k = lo; k <= hi; k++) {
      if (i > mid) {
        sortable[k] = aux[j++];
      } else if (j > hi) {
        sortable[k] = aux[i++];
      } else if (compare(aux[j], aux[i])) {
        sortable[k] = aux[j++];
      } else {
        sortable[k] = aux[i++];
      }
    }
  };

  const merge = createMerger(compare);

  function innerSort(sortable: T[], aux: T[], lo: number, hi: number) {
    if (hi <= lo) {
      return;
    }
    const mid = lo + Math.floor((hi - lo) / 2);
    innerSort(sortable, aux, lo, mid);
    innerSort(sortable, aux, mid + 1, hi);
    merge(sortable, aux, lo, mid, hi);
  }

  function bottomUpSort(sortable: T[]) {
    const N = sortable.length;
    const aux = new Array(N);

    for (let size = 1; size < N; size = size + size) {
      for (let lo = 0; lo < N - size; lo += size + size) {
        const mid = lo + size + 1;
        const hi = Math.min(lo + 2 * size - 1, N - 1);
        console.log('merging', lo, mid, hi);
        merge(sortable, aux, lo, mid, hi);
        console.log(sortable);
      }
    }

    return sortable;
  }

  function sort(sortable: T[]) {
    const aux = new Array(sortable.length);

    innerSort(sortable, aux, 0, sortable.length - 1);

    return sortable;
  }

  return bottomUp ? bottomUpSort : sort;
};

export const sort = createSorter(isLess);
export const bottomUpSort = createSorter(isLess, { bottomUp: true });
