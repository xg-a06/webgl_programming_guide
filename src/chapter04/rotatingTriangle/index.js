import { createCanvas, initShaders } from '../../util'
import vshader from './vshader.glsl';
import fshader from './fshader.glsl';

const demo = () => {

  const canvas = createCanvas();

  const gl = canvas.getContext('webgl');

  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  gl.clear(gl.COLOR_BUFFER_BIT);

  const program = initShaders(gl, vshader, fshader);

  const a_Position = gl.getAttribLocation(program, 'a_Position');

  const vertices = new Float32Array([0.0, 0.5, -0.5, -0.5, 0.5, -0.5,]);

  const n = 3;

  const vertexBuffer = gl.createBuffer();

  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

  gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);

  gl.enableVertexAttribArray(a_Position);


  const u_ModelMatrix = gl.getUniformLocation(program, 'u_ModelMatrix');

  const ANGLE_STEP = 45.0;
  const tx = 0.35;
  const modelMatrix = new Matrix4();

  let currentAngle = 0.0;
  let g_last = Date.now();

  const tick = () => {
    const now = Date.now();
    const elapsed = now - g_last;
    g_last = now;
    currentAngle = (currentAngle + (ANGLE_STEP * elapsed) / 1000) % 360;

    modelMatrix.setRotate(currentAngle, 0, 0, 1);
    modelMatrix.translate(tx, 0, 0)
    gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements);

    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.drawArrays(gl.TRIANGLES, 0, n);

    requestAnimationFrame(tick)
  }

  tick();

}

export default demo;