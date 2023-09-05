import { } from "/js/gl-matrix-min.js"
export class Drawingboard {
    onMouseDown(event) {
        this.isDrawing = true;
        this.positions = []; // 清空顶点数据
    }

    onMouseUp(event) {
        this.isDrawing = false;
    }

    onMouseMove(event) {
        if (!this.isDrawing) return;

        const rect = event.target.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        //const ndcX = (x - rect.width / 2) / (rect.width / 2);// (x / rect.width/2) * 2 - 1;
        //const ndcY = (rect.height / 2 - y) / (rect.height / 2);//1 - (y / rect.height / 2) * 2;
        const normalizedX = (2.0 * x / rect.width) - 1.0;
        const normalizedY = 1.0 - (2.0 * y / rect.height);
        // const movc4 = vec4.create();
        // vec4.set(movc4, x - rect.width / 2, rect.height / 2 - y, 0.0, 1.0);
        // const invmat41 = mat4.create();
        // mat4.invert(invmat41, this.projMatrix);
        // const invmat42 = mat4.create();
        // mat4.invert(invmat42, this.viewMatrix);

        // let worldPoint = vec4.create();

        // vec4.transformMat4(worldPoint, movc4, invmat41);
        // vec4.transformMat4(worldPoint, movc4, invmat42);
        // let mat41 = mat4.create();
        // mat4.multiply(mat41, invmat41, invmat42);

        const movc4 = vec4.create();
        vec4.set(movc4, x, y, 0.0, 1.0);
        let mat41 = mat4.create();
        mat4.multiply(mat41, this.projMatrix, this.viewMatrix);
        const result = vec4.create();
        vec4.transformMat4(result, movc4, mat41);
        //vec4.transformMat4(result, result, this.projMatrix);
        this.positions.push(result[0], result[1], result[2]); // 存储顶点坐标

    }
    constructor(canvas, bdraw) {
        this.canvas = canvas;
        this.isDrawing = false;
        this.positions = [];
        if (this.canvas && bdraw) {

            this.canvas.onmousedown = (event) => { this.onMouseDown(event); };
            this.canvas.onmouseup = (event) => { this.onMouseUp(event) };
            this.canvas.onmousemove = (event) => { this.onMouseMove(event) };
        }
    }
}