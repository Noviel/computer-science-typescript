type Shape = 'sphere' | 'rectangle';

interface BoundingSphere {
  shape: 'sphere';
  radius: number;
}

interface BoundingRect {
  shape: 'rectangle';
  width: number;
  height: number;
}

type BoundingShape = BoundingSphere | BoundingRect;

export interface PhysicsObjectDesc {
  x: number;
  y: number;

  vx: number;
  vy: number;

  bounding: BoundingShape;
}

export class PhysicsObject {
  x: number;
  y: number;

  vx: number;
  vy: number;

  bounding: BoundingShape;

  constructor(desc: PhysicsObjectDesc) {
    this.x = desc.x;
    this.y = desc.y;
    this.vx = desc.vx;
    this.vy = desc.vy;

    this.bounding = desc.bounding;
  }

  setVelocity(newVelocity: [number, number]) {
    this.vx = newVelocity[0];
    this.vy = newVelocity[1];
  }
}