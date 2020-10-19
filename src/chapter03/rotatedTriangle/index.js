import { createCanvas, initShaders } from '../../util'
import vshader from './vshader.glsl';
import fshader from './fshader.glsl';

const demo = () => {

  const canvas = createCanvas();

  const gl = canvas.getContext('webgl');

  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  gl.clear(gl.COLOR_BUFFER_BIT);

  const program = initShaders(gl, vshader, fshader);

  const angle = 90.0;
  const radian = angle * Math.PI / 180.0;
  const sinB = Math.sin(radian);
  const cosB = Math.cos(radian);

  const u_SinB = gl.getUniformLocation(program, 'u_SinB');
  const u_CosB = gl.getUniformLocation(program, 'u_CosB');

  gl.uniform1f(u_SinB, sinB);
  gl.uniform1f(u_CosB, cosB);

  const a_Position = gl.getAttribLocation(program, 'a_Position');

  const vertices = new Float32Array([0.0, 0.5, -0.5, -0.5, 0.5, -0.5,]);

  const n = 3;

  const vertexBuffer = gl.createBuffer();

  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

  gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);

  gl.enableVertexAttribArray(a_Position);

  gl.drawArrays(gl.TRIANGLES, 0, n);

}

export default demo;