const createCanvas = () => {
  const canvas = document.createElement('canvas');
  canvas.id = 'webgl';
  canvas.width = 400;
  canvas.height = 400;
  document.body.appendChild(canvas);
  return canvas;
}

const loadShader = (gl, type, source) => {
  // Create shader object
  const shader = gl.createShader(type);

  // Set the shader program
  gl.shaderSource(shader, source);

  // Compile the shader
  gl.compileShader(shader);

  // Check the result of compilation
  var compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (!compiled) {
    var error = gl.getShaderInfoLog(shader);
    console.error('Failed to compile shader: ' + error);
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

const initShaders = (gl, vshader, fshader) => {
  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vshader);
  const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fshader);

  if (!vertexShader || !fragmentShader) {
    return null;
  }

  // Create a program object
  const program = gl.createProgram();
  if (!program) {
    return null;
  }

  // Attach the shader objects
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);

  // Link the program object
  gl.linkProgram(program);

  // Check the result of linking
  const linked = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (!linked) {
    var error = gl.getProgramInfoLog(program);
    console.log('Failed to link program: ' + error);
    gl.deleteProgram(program);
    gl.deleteShader(fragmentShader);
    gl.deleteShader(vertexShader);
    return null;
  }

  gl.useProgram(program);

  return program;
}

export {
  createCanvas,
  initShaders
}