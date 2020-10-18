import { createCanvas, initShaders } from '../../util'
import vshader from './vshader.glsl';
import fshader from './fshader.glsl';

const demo = () => {

  const canvas = createCanvas();

  const gl = canvas.getContext('webgl');

  const program = initShaders(gl, vshader, fshader);

  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  gl.clear(gl.COLOR_BUFFER_BIT);

  const a_Position = gl.getAttribLocation(program, 'a_Position');
  const u_FragColor = gl.getUniformLocation(program, 'u_FragColor');

  const g_Points = [];
  const g_Colors = [];

  canvas.addEventListener('mousedown', (e) => {
    const x = (e.offsetX - canvas.width / 2) / (canvas.width / 2);
    const y = (canvas.height / 2 - e.offsetY) / (canvas.height / 2);

    g_Points.push({ x, y });

    if (x >= 0.0 && y >= 0.0) {
      g_Colors.push([1.0, 0.0, 0.0, 1.0]);
    } else if (x < 0.0 && y < 0.0) {
      g_Colors.push([0.0, 1.0, 0.0, 1.0]);
    } else {
      g_Colors.push([1.0, 1.0, 1.0, 1.0]);
    }

    gl.clear(gl.COLOR_BUFFER_BIT);

    const { length } = g_Points;

    for (let i = 0; i < length; i++) {
      const { x, y } = g_Points[i];
      const color = g_Colors[i];

      gl.vertexAttrib3f(a_Position, x, y, 0);
      gl.uniform4fv(u_FragColor, color)
      gl.drawArrays(gl.POINTS, 0, 1);
    }
  })

}

export default demo;