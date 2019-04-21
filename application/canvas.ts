import { Scene } from './scene';

interface Options {
  canvasId: string;
  width: number;
  height: number;
}

const defaultOptions: Options = {
  canvasId: 'canvas',
  width: window.innerWidth,
  height: window.innerHeight,
};

export function createRenderer({ scene }: { scene: Scene }, options: Options = defaultOptions) {
  const canvas = document.getElementById(options.canvasId) as HTMLCanvasElement;
  canvas.width = options.width;
  canvas.height = options.height;

  const ctx = canvas.getContext('2d');

  function draw() {
    ctx.fillStyle = `rgba(255, 255, 255, 0.3)`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (const object of scene.objects) {
      const { renderObject } = object;
      const [x, y] = object.getPosition();
      ctx.fillStyle = renderObject.fill;
      ctx.strokeStyle = renderObject.stroke;
      if (renderObject.shape === 'rectangle') {
        ctx.fillRect(x, y, renderObject.width, renderObject.height);
        ctx.strokeRect(x, y, renderObject.width, renderObject.height);
      } else if (renderObject.shape === 'sphere') {
        ctx.beginPath();
        ctx.arc(x, y, renderObject.radius, 0, Math.PI * 2, true);
        ctx.fill();
        ctx.stroke();
      }
    }
    window.requestAnimationFrame(draw);
  }

  function render() {
    window.requestAnimationFrame(draw);
  }

  return {
    draw,
    render,
  };
}
