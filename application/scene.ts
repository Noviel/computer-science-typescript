import { RenderObject } from './renderObject';
import { PhysicsObject } from './physics';

export interface ISceneObject {
  getPosition(): [number, number];
}

interface IScene {
  objects: SceneObject[];
  addObject(object: SceneObject): void;
}

export class SceneObject implements ISceneObject {
  public renderObject: RenderObject;
  public physics: PhysicsObject;

  constructor(render: RenderObject, physics: PhysicsObject) {
    this.renderObject = render;
    this.physics = physics;
  }

  public getPosition(): [number, number] {
    return [this.physics.x, this.physics.y];
  }
}

export class Scene implements IScene {
  public objects: SceneObject[];
  constructor() {
    this.objects = [];
  }

  public addObject(object: SceneObject) {
    this.objects.push(object);
  }

  public tick(dt: number) {
    for (const object of this.objects) {
      object.physics.x += object.physics.vx * dt;
      object.physics.y += object.physics.vy * dt;
    }
  }
}

export const createScene = () => {
  const scene = new Scene();

  return scene;
};
