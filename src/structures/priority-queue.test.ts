import { MaxPriorityQueue } from './priority-queue';

describe('MaxPriorityQueue', () => {
  it('should be good', () => {
    const pq = new MaxPriorityQueue<number>(2);
    pq.insert(-100);
    pq.insert(0);
    pq.insert(1);
    pq.insert(10);
    pq.insert(150);

    let ordered: number[] = [];
    for (let i = 0; i < 5; i++) {
      ordered.push(pq.getMax());
    }
    expect(ordered).toEqual([150, 10, 1, 0, -100]);
  });
});
