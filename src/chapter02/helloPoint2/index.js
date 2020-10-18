import { createCanvas, initShaders } from '../../util'
import vshader from './vshader.glsl';
import fshader from './fshader.glsl';

const demo = () => {

  const canvas = createCanvas();

  const gl = canvas.getContext('webgl');

  const program = initShaders(gl, vshader, fshader);

  const a_Position = gl.getAttribLocation(program, 'a_Position');

  gl.vertexAttrib3f(a_Position, 0.0, 0.0, 0.0);

  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  gl.clear(gl.COLOR_BUFFER_BIT);

  gl.drawArrays(gl.POINTS, 0, 1);
}

export default demo;