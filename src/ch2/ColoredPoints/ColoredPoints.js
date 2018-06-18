const cuonUtils = require('../../../lib/cuon-utils');
const VSHADER_SOURCE = require('./ColoredPoints.vertex.glsl');
const FSHADER_SOURCE = require('./ColoredPoints.fragment.glsl');

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
    const u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
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

        let color;
        if (webglCoord[0] <= 0  && webglCoord[1] >= 0) {
            color = [1.0, 0.0, 0.0, 1.0];
        } else if (webglCoord[0] >= 0 && webglCoord[1] >= 0) {
            color = [0.0, 1.0, 0.0, 1.0];
        } else if (webglCoord[0] >= 0 && webglCoord[1] <= 0) {
            color = [0.0, 0.0, 1.0, 1.0];
        } else {
            color = [1.0, 1.0, 1.0, 1.0];
        }

        points.push({
            coord: webglCoord,
            color
        });

        points.forEach((point) => {
            gl.vertexAttrib3f(a_Position, point.coord[0], point.coord[1], 0.0);
            gl.uniform4f(u_FragColor, point.color[0], point.color[1], point.color[2], point.color[3]);
            gl.drawArrays(gl.POINTS, 0, 1);
        });
    }
    
    canvas.addEventListener('click', onCanvasClick);
}

module.exports = main;
