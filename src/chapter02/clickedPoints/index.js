import { createCanvas, initShaders } from '../../util'
import vshader from './vshader.glsl';
import fshader from './fshader.glsl';

const demo = () => {

  const canvas = createCanvas();

  const gl = canvas.getContext('webgl');

  const program = initShaders(gl, vshader, fshader);



  const a_Position = gl.getAttribLocation(program, 'a_Position');

  const g_Points = [];

  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  gl.clear(gl.COLOR_BUFFER_BIT);

  canvas.addEventListener('mousedown', (e) => {
    const x = (e.offsetX - canvas.width / 2) / (canvas.width / 2);
    const y = (canvas.height / 2 - e.offsetY) / (canvas.height / 2);

    g_Points.push({ x, y });

    gl.clear(gl.COLOR_BUFFER_BIT);

    g_Points.forEach(({ x, y }) => {
      gl.vertexAttrib3f(a_Position, x, y, 0)
      gl.drawArrays(gl.POINTS, 0, 1);
    });
  })

}

export default demo;