const cuonUtils = require('../../../lib/cuon-utils');
const VSHADER_SOURCE = require('./ClickPoint.vertex.glsl');
const FSHADER_SOURCE = require('./ClickPoint.fragment.glsl');

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

    const a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    const a_PointSize = gl.getAttribLocation(gl.program, 'a_PointSize');

    if (a_Position < 0) {
        throw new Error('Failed to get the storage location of a_Position');
    }

    gl.vertexAttrib1f(a_PointSize, 5.0);
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    const points = [];

    function onCanvasClick(e) {
        gl.clear(gl.COLOR_BUFFER_BIT);
        const center = [canvas.width / 2, canvas.height / 2];
        const webglCoord = [
            (e.offsetX - center[0]) / center[0],
            (center[1] - e.offsetY) / center[1]
        ];
        points.push(webglCoord);

        points.forEach((point) => {
            gl.vertexAttrib3f(a_Position, point[0], point[1], 0.0);
            gl.drawArrays(gl.POINTS, 0, 1);
        });
    }
    
    canvas.addEventListener('click', onCanvasClick);
}

module.exports = main;
