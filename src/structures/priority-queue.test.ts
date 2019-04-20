import { MaxPriorityQueue } from './priority-queue';

describe('MaxPriorityQueue', () => {
  it('should work with default comparator', () => {
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

  it('should work with custom comparator', () => {
    type Obj = {
      priority: number;
      data: string;
    };

    const objects = [
      { priority: 100, data: 'with 100 priority' },
      { priority: 5, data: 'with 5 priority' },
      { priority: 0, data: 'with 0 priority' },
      { priority: -20, data: 'with -20 priority' },
    ];

    const pq = new MaxPriorityQueue<Obj>(2, (a, b) => a.priority < b.priority);
    pq.insert(objects[2]);
    pq.insert(objects[1]);
    pq.insert(objects[0]);
    pq.insert(objects[3]);

    let ordered: Obj[] = [];
    for (let i = 0; i < objects.length; i++) {
      ordered.push(pq.getMax());
    }
    expect(ordered).toEqual(objects);
  });
});
