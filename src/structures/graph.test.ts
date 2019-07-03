import { UnidirectionalGraph, depthFirstSearch, VertexConnection } from './graph';

const edges = [[0, 1], [1, 2], [2, 0]] as VertexConnection[];
const verticesCount = edges.length;

describe(`Unidirectional Graph`, () => {
  it(`Created from initial data`, () => {
    const graph = new UnidirectionalGraph(verticesCount, edges);

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
    const graph = new UnidirectionalGraph(verticesCount, edges);
    const search = depthFirstSearch(graph, 0);
    for (let i = 0; i < graph.verticesCount; i++) {
      expect(search.marked(i)).toBe(true);
    }
    expect(search.count).toBe(graph.verticesCount);
  });

  it(`Depth First Search detects unconnected graph`, () => {
    const graph = new UnidirectionalGraph(verticesCount, edges);
    const search = depthFirstSearch(graph, 0);
    for (let i = 0; i < graph.verticesCount; i++) {
      expect(search.marked(i)).toBe(true);
    }
    expect(search.count).toBe(graph.verticesCount);
  });

});
