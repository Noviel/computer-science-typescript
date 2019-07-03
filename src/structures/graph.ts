/* Array with identifiers of two connected things */
type Connection<Id> = [Id, Id];

/* Ids of two connected vertices */
export type VertexConnection = Connection<number>;

const validateVertex = (v: number, count: number) => {
  if (v < 0 || v >= count) {
    throw new Error(`Vertex with index ${v} is not in range [${0}, ${count - 1}]`);
  }
};

function nonNegativeItemsCountError(names: string) {
  throw new Error(`Number of ${names} in Graph must be nonnegative`);
}

export class UnidirectionalGraph {
  private V: number;
  private E: number;

  /* Adjacency-list representation of a graph */
  public adj: Record<number, Record<number, number>>;

  public constructor(verticesCount: number, data: VertexConnection[]) {
    this.E = 0;
    try {
      if (verticesCount < 0) {
        nonNegativeItemsCountError('vertices');
      }

      this.adj = {};
      for (let v = 0; v < verticesCount; v++) {
        this.adj[v] = {};
      }
      this.V = verticesCount;

      const edgesCount = data.length;

      if (edgesCount < 0) {
        nonNegativeItemsCountError('edges');
      }

      for (const [v, w] of data) {
        this.addEdge(v, w);
      }
    } catch (e) {
      throw new Error(`Invalid input format for UnidirectionalGraph`);
    }
  }

  public degree(v: number) {
    this.validateVertex(v);
    return Object.keys(this.adj[v]).length;
  }

  public get verticesCount() {
    return this.V;
  }

  public get edgesCount() {
    return this.E;
  }

  public adjacentTo(v: number) {
    this.validateVertex(v);
    return this.adj[v];
  }

  private validateVertex(v: number) {
    validateVertex(v, this.V);
  }

  private addEdge(v: number, w: number) {
    this.validateVertex(v);
    this.validateVertex(w);
    this.E++;
    this.adj[v][w] = w;
    this.adj[w][v] = v;
  }

  public toString() {
    let output = '';
    output += `${this.V} vertices, ${this.E} edges \n`;
    for (let v = 0; v < this.V; v++) {
      output += `${v}: `;
      for (let w of Object.values(this.adj[v])) {
        output += `${w} `;
      }
      output += '\n';
    }
    return output;
  }
}

export function depthFirstSearch(graph: UnidirectionalGraph, v: number) {
  const isMarked: boolean[] = Array.from({ length: graph.verticesCount }, _ => false);
  /* count of connected vertices */
  let count = 0;

  const validate = (v: number) => validateVertex(v, isMarked.length);

  const marked = (v: number) => {
    validate(v);
    return isMarked[v];
  };

  const dfs = (graph: UnidirectionalGraph, v: number) => {
    count++;
    isMarked[v] = true;
    for (let w of Object.values(graph.adjacentTo(v))) {
      if (!isMarked[w]) {
        dfs(graph, w);
      }
    }
  };

  dfs(graph, v);

  return { marked, count };
}

export function depthFirstPaths(graph: UnidirectionalGraph, source: number) {
  const isMarked: boolean[] = Array.from({ length: graph.verticesCount }, _ => false);

  const edgeTo: number[] = [];

  const validate = (v: number) => validateVertex(v, isMarked.length);

  const dfs = (graph: UnidirectionalGraph, v: number) => {
    isMarked[v] = true;
    for (let w of Object.values(graph.adjacentTo(v))) {
      if (!isMarked[w]) {
        edgeTo[w] = v;
        dfs(graph, w);
      }
    }
  };

  validate(source);
  dfs(graph, source);

  return {
    hasPathTo: (v: number) => {
      validate(v);
      return isMarked[v];
    },
    pathTo(v: number) {
      validate(v);
      if (!this.hasPathTo(v)) {
        return null;
      }
      const path: number[] = [];
      for (let x = v; x !== source; x = edgeTo[x]) {
        path.push(x);
      }
      path.push(source);
      return path.reverse();
    },
  };
}
