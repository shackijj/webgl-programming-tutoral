const cuonUtils = require('../../../lib/cuon-utils');
const VSHADER_SOURCE = require('./vertex.glsl');
const FSHADER_SOURCE = require('./fragment.glsl');
const {Matrix4} = require('../../../lib/cuon-matrix');

const ANGLE_STEP = 45.0;
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

    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    let currentAngle = 0.0;
    const xformMatrix = new Matrix4();
    const u_xformMatrix = gl.getUniformLocation(gl.program, 'u_xformMatrix');
    function tick() {
        currentAngle = animate(currentAngle);
        draw(gl, n, currentAngle, xformMatrix, u_xformMatrix);
        requestAnimationFrame(tick);
    }

    tick();
}

function draw(gl, n, currentAngle, xformMatrix, u_xformMatrix) {
    xformMatrix.setRotate(currentAngle, 0, 0, 1);
    xformMatrix.translate(0.2, 0, 0);
    gl.uniformMatrix4fv(u_xformMatrix, false, xformMatrix.elements);

    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.drawArrays(gl.TRIANGLES, 0, n);
}

let g_last = Date.now();

function animate(angle) {
    const now = Date.now();
    const elapsed = now - g_last;
    g_last = now;
    const newAngle = angle + ((ANGLE_STEP * elapsed) / 1000.0);
    return newAngle % 360;
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
