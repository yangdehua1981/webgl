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
        const x = event.clientX - rect.left - 30;
        const y = event.clientY - rect.top - 30;

        const normalizedX = (2.0 * x / (rect.width - 60)) - 1.0;
        const normalizedY = 1.0 - (2.0 * y / (rect.height - 60));
        const movc4 = vec4.create();
        vec4.set(movc4, normalizedX, normalizedY, -1.0, 1.0);

        const invmat41 = mat4.create();
        mat4.invert(invmat41, this.projMatrix);

        const movc41 = vec4.create();
        vec4.transformMat4(movc41, movc4, invmat41);
        vec4.scale(movc41, movc41, movc41[3]); // 归一化

        const invmat42 = mat4.create();
        mat4.invert(invmat42, this.viewMatrix);
        vec4.transformMat4(movc41, movc41, invmat42);
        vec4.scale(movc41, movc41, movc41[3]);
        //console.log(movc41);
        this.positions.push(movc41[0], movc41[1], 0); // 存储顶点坐标

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