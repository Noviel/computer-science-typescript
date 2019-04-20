import { swap } from '../lib/swap';
import { intHalf } from '../lib/int';

function less<T>(comparables: T[], i: number, j: number) {
  return comparables[i] < comparables[j];
}

/*
  Priority queue based on binary heap
*/

class MaxPriorityQueue<T> {
  private pq: T[];
  private N: number;

  constructor(capacity: number) {
    this.pq = new Array(capacity + 1);
    this.N = 0;
  }

  isEmpty() {
    return this.N === 0;
  }

  insert(key: T) {
    this.pq[++this.N] = key;
    this.swim(this.N);
  }

  swim(k: number) {
    let halfK = intHalf(k);
    while (k > 1 && less(this.pq, halfK, k)) {
      swap(this.pq, k, halfK);
      k = halfK;
      halfK = intHalf(k);
    }
  }

  sink(k: number) {
    while (2 * k <= this.N) {
      let j = 2 * k;
      if (j < this.N && less(this.pq, j, j + 1)) {
        j++;
      }
      if (!less(this.pq, k, j)) {
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
