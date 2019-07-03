import { UnidirectionalGraph, depthFirstSearch, depthFirstPaths, VertexConnection } from './graph';

const edgesConnected = [
  [0, 5],
  [2, 4],
  [2, 3],
  [1, 2],
  [0, 1],
  [3, 4],
  [3, 5],
  [0, 2],
] as VertexConnection[];

const edgesUnconnected = [
  [0, 5],
  [4, 3],
  [0, 1],
  [9, 12],
  [6, 4],
  [5, 4],
  [0, 2],
  [11, 12],
  [9, 10],
  [0, 6],
  [7, 8],
  [9, 11],
  [5, 3],
] as VertexConnection[];

const verticesCountConnected = 6;
const verticesCountUnconnected = 13;

describe(`Unidirectional Graph`, () => {
  it(`Created from initial data`, () => {
    const graph = new UnidirectionalGraph(3, [[0, 1], [1, 2], [2, 0]]);

    expect(graph.adjacentTo(0)).toStrictEqual({
      1: 1,
      2: 2,
    });

    expect(graph.adjacentTo(1)).toStrictEqual({
      0: 0,
      2: 2,
    });

    expect(graph.adjacentTo(2)).toStrictEqual({
      0: 0,
      1: 1,
    });
  });

  it(`Depth First Search detects connected graph`, () => {
    const graph = new UnidirectionalGraph(verticesCountConnected, edgesConnected);
    const search = depthFirstSearch(graph, 0);
    for (let i = 0; i < graph.verticesCount; i++) {
      expect(search.marked(i)).toBe(true);
    }
    expect(search.count).toBe(graph.verticesCount);
  });

  it(`Depth First Search detects unconnected graph`, () => {
    const graph = new UnidirectionalGraph(verticesCountUnconnected, edgesUnconnected);
    const search = depthFirstSearch(graph, 0);
    expect(search.marked(0)).toBe(true);
    expect(search.marked(7)).toBe(false);
    expect(search.count).toBe(7);
  });

  it(`Depth First Path search finds a path or it's absent`, () => {
    const graph = new UnidirectionalGraph(5, [[0, 1], [1, 2], [2, 3], [0, 3]]);
    const path = depthFirstPaths(graph, 0);

    expect(path.pathTo(3)).toEqual([0, 1, 2, 3]);
    expect(path.pathTo(4)).toEqual(null);
  });
});
