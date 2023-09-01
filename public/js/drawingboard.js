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

        const positionX = x;// (x / event.target.width) * 2 - 1; // 转换到 WebGL 坐标系范围（-1 到 1）
        const positionY = y;// -(y / event.target.height) * 2 + 1; // 转换到 WebGL 坐标系范围（-1 到 1）

        this.positions.push(positionX, positionY, 0); // 存储顶点坐标

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