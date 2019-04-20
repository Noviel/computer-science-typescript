import { swap } from '../lib/swap';
import { intHalf } from '../lib/int';
import { CompareFunc, isLess } from '../lib/comparators';

/*
  Priority queue based on binary heap
*/

class MaxPriorityQueue<T> {
  private pq: T[];
  private N: number;
  private compare: CompareFunc<T>;

  constructor(capacity: number, compare: CompareFunc<T> = isLess) {
    this.pq = new Array(capacity + 1);
    this.N = 0;
    this.compare = compare;
  }

  isEmpty() {
    return this.N === 0;
  }

  insert(key: T) {
    this.pq[++this.N] = key;
    this.swim(this.N);
  }

  swim(k: number) {
    const { compare, pq } = this;
    let halfK = intHalf(k);
    while (k > 1 && compare(pq[halfK], pq[k])) {
      swap(this.pq, k, halfK);
      k = halfK;
      halfK = intHalf(k);
    }
  }

  sink(k: number) {
    const { compare, pq } = this;
    while (2 * k <= this.N) {
      let j = 2 * k;
      if (j < this.N && compare(pq[j], pq[j + 1])) {
        j++;
      }
      if (!compare(pq[k], pq[j])) {
        break;
      }
      swap(this.pq, k, j);
      k = j;
    }
  }

  getMax() {
    const max = this.pq[1];
    swap(this.pq, 1, this.N--);
    this.sink(1);
    this.pq.length--;
    return max;
  }
}

export { MaxPriorityQueue };
