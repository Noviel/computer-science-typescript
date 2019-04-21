type Shape = 'sphere' | 'rectangle';

export interface RenderObjectGeneric {
  fill: string;
  stroke: string;
}

interface RenderObjectSphere extends RenderObjectGeneric {
  shape: 'sphere';
  radius: number;
}

interface RenderObjectRectangle extends RenderObjectGeneric {
  shape: 'rectangle';
  width: number;
  height: number;
}

export type RenderObject = RenderObjectRectangle | RenderObjectSphere;