const cuonUtils = require('../../../lib/cuon-utils');
const VSHADER_SOURCE = require('./vertex.glsl');
const FSHADER_SOURCE = require('./fragment.glsl');

/**
 * This main function of the app
 * @return {void}
 */
function main() {
    const canvas = document.getElementById('webgl');
    const gl = cuonUtils.getWebGLContext(canvas);
    if (!gl) {
        throw new Error('Failed to get the rendering context for WebGL');
    }

    if (!cuonUtils.initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
        throw new Error('Failed to initialize shaders.');
    }

    const n = initVertexBuffers(gl);
    if (n < 0) {
        throw new Error('Failted to set the positions for vertices.');
    }

    const Tx = 0.5;
    const Ty = 0.5;
    const Tz = 0;

    const u_Translate = gl.getUniformLocation(gl.program, 'u_Translation');
    gl.uniform4f(u_Translate, Tx, Ty, Tz, 0.0);
    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.drawArrays(gl.TRIANGLES, 0, n);
}

function initVertexBuffers(gl) {
    const vertices = new Float32Array([0.0, 0.5, -0.5, -0.5, 0.5, -0.5]);
    const n = 3;

    const vertexBuffer = gl.createBuffer();
    if (!vertexBuffer) {
        throw new Error('Failed to create the buffer');
    }

    const a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    if (a_Position < 0) {
        throw new Error('Failed to get the storage location of a_Position');
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(a_Position);

    return n;
}

module.exports = main;
