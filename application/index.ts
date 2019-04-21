import { fibPolynomial } from '../src/basic/fibonacci';

import { createRenderer } from './canvas';
import { createScene, SceneObject } from './scene';
import { RenderObject } from './renderObject';
import { PhysicsObject } from './physics';

const N = 50;
console.log(`${N} Fibonacci number: `, fibPolynomial(N));

const scene = createScene();
const renderer = createRenderer({ scene });

const rect = new SceneObject(
  {
    shape: 'rectangle',
    fill: 'red',
    stroke: 'black',
    width: 200,
    height: 200,
  },
  new PhysicsObject({
    bounding: {
      shape: 'rectangle',
      width: 200,
      height: 200,
    },
    x: 100,
    vx: 0,
    vy: 0,
    y: 100,
  })
);

scene.addObject(rect);

let counter = 0;
const delta = 16;

setInterval(() => {
  counter += 0.01 * delta;
  rect.physics.setVelocity([Math.sin(counter*0.2) * 0.5, 0]);
  scene.tick(5);
}, 5);

renderer.render();
