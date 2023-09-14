import { Drawingboard } from "/js/drawingboard.js";
import { } from "/js/gl-matrix-min.js"

const canvas = document.getElementById("drawer");
const gl = canvas.getContext("webgl");
gl.viewport(0, 0, canvas.width, canvas.height);
var board = new Drawingboard(canvas, true);

canvas.addEventListener("resize", () => {
    gl.viewport(0, 0, canvas.clientWidth, canvas.clientHeight);
    alert("r");
});



const cameraPosition = [0, 0, 1000]; // 相机位置 (x, y, z)
const target = [0, 0, 0.0]; // 目标点 (x, y, z)
const up = [0, 1, 0]; // 上方向 (x, y, z)

const viewMatrix = mat4.create(); // 创建一个4x4的单位矩阵
mat4.identity(viewMatrix);
mat4.lookAt(viewMatrix, cameraPosition, target, up);
const projMatrix = mat4.create();
mat4.identity(projMatrix)
//mat4.ortho(projMatrix, 0, canvas.width, canvas.height, 0, -1.0, 1.0);
mat4.perspective(
    projMatrix,
    Math.PI / 4,
    canvas.width / canvas.height,
    0.1,
    1000
);
board.viewMatrix = viewMatrix;
board.projMatrix = projMatrix;

const vertexShaderSource = `
          attribute vec3 a_position;
          uniform mat4 u_ProjMaterix;
          uniform mat4 u_viewMatrix;
          void main() {
              gl_Position = u_ProjMaterix*u_viewMatrix*vec4(a_position, 1.0);
          }
      `;

// 片元着色器
const fragmentShaderSource = `
          precision mediump float;
          uniform vec4 u_color;
          void main() {
              gl_FragColor = u_color;
          }
      `;

// 创建着色器程序
function createShaderProgram(
    gl,
    vertexShaderSource,
    fragmentShaderSource
) {
    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertexShaderSource);
    gl.compileShader(vertexShader);
    if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
        alert(
            `An error occurred compiling the shaders: ${gl.getShaderInfoLog(
                vertexShader
            )}`
        );
        gl.deleteShader(vertexShader);
        return null;
    }

    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragmentShaderSource);
    gl.compileShader(fragmentShader);

    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        alert(
            `Unable to initialize the shader program: ${gl.getProgramInfoLog(
                program
            )}`
        );
        return null;
    }

    return program;
}

const program = createShaderProgram(
    gl,
    vertexShaderSource,
    fragmentShaderSource
);

// 获取 attribute 和 uniform 变量的位置
const positionAttributeLocation = gl.getAttribLocation(
    program,
    "a_position"
);
const colorUniformLocation = gl.getUniformLocation(program, "u_color");

// 渲染函数
function render() {
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearDepth(1.0); // Clear everything
    gl.enable(gl.DEPTH_TEST); // Enable depth testing
    gl.depthFunc(gl.LEQUAL); // Near things obscure far things
    gl.clearColor(1, 1, 1, 1);
    gl.clear(gl.COLOR_BUFFER_BIT); // | gl.DEPTH_BUFFER_BIT);

    gl.useProgram(program);

    const positionBuffer = gl.createBuffer();
    var points = [0.0, 0.0, 0.0,
        -196, 100.0, 0.0
    ];
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(board.positions), //(board.positions),
        gl.STATIC_DRAW
    );

    gl.enableVertexAttribArray(positionAttributeLocation);
    gl.vertexAttribPointer(
        positionAttributeLocation,
        3,
        gl.FLOAT,
        false,
        0,
        0
    );
    const viewMatrixLocation = gl.getUniformLocation(
        program,
        "u_viewMatrix"
    );
    gl.uniformMatrix4fv(viewMatrixLocation, false, viewMatrix);
    const u_ProjMaterix = gl.getUniformLocation(program, "u_ProjMaterix");
    gl.uniformMatrix4fv(u_ProjMaterix, false, projMatrix);

    gl.uniform4f(colorUniformLocation, 0.0, 0.0, 0.0, 1.0); // 设置线段颜色为白色

    gl.drawArrays(gl.LINE_STRIP, 0, board.positions.length / 3); //.positions.length / 3);

    requestAnimationFrame(render);
}

render();