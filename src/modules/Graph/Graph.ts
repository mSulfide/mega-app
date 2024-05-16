import Point from "../Math3D/entities/Point";

export type TWIN2D = {
    left: number;
    bottom: number;
    width: number;
    height: number;
}

export type TWIN3D = TWIN2D & {
    camera: Point;
    center: Point;
}

export type TWIN = TWIN2D | TWIN3D;

export type TGraph = {
    id?: string;
    width?: number;
    height?: number;
    WIN: TWIN;
    callbacks: {
        wheel: (event: WheelEvent) => void;
        mousemove: (event: MouseEvent) => void;
        mouseleave: () => void;
        mouseup: () => void;
        mousedown: () => void;
    }
}

class Graph {
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;
    private WIN: TWIN;
    constructor({ id, width = 300, height = 300, WIN, callbacks }: TGraph) {
        if (id) {
            this.canvas = document.getElementById(id) as HTMLCanvasElement;
        } else {
            this.canvas = document.createElement('canvas');
            //document.querySelector('body').appendChild(this.canvas);
        }
        this.canvas.width = width;
        this.canvas.height = height;
        this.context = this.canvas.getContext('2d') as CanvasRenderingContext2D;
        this.WIN = WIN;

        const { wheel, mousemove, mouseleave, mouseup, mousedown } = callbacks/* | {
            wheel: () => '',
            mousemove: () => '',
            mouseleave: () => '',
            mouseup: () => '',
            mousedown: () => ''
        }*/;
        this.canvas.addEventListener('wheel', wheel);
        this.canvas.addEventListener('mousemove', mousemove);
        this.canvas.addEventListener('mouseleave', mouseleave);
        this.canvas.addEventListener('mouseup', mouseup);
        this.canvas.addEventListener('mousedown', mousedown);
    }

    xs(x: number): number {
        return (x - this.WIN.left) / this.WIN.width * this.canvas.width;
    }

    ys(y: number): number {
        return (-y + (this.WIN.bottom + this.WIN.height)) / this.WIN.height * this.canvas.height;
    }

    sx(x: number): number {
        return x * this.WIN.width / this.canvas.width;
    }

    sy(y: number): number {
        return -y * this.WIN.height / this.canvas.height;
    }

    clear(): void {
        this.context.fillStyle = '#efe';
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    line(x1: number, y1: number, x2: number, y2: number, color: string = '#f00', width: number = 1): void {
        this.context.beginPath();
        this.context.strokeStyle = color;
        this.context.lineWidth = width;
        this.context.moveTo(this.xs(x1), this.ys(y1));
        this.context.lineTo(this.xs(x2), this.ys(y2));
        this.context.stroke();
        this.context.closePath();
    }

    point(x: number, y: number, color: string = '#f00', size: number = 2): void {
        this.context.beginPath();
        this.context.strokeStyle = color;
        this.context.arc(this.xs(x), this.ys(y), size, 0, 2 * Math.PI);
        this.context.stroke();
        this.context.closePath();
    }

    polygon(points: Omit<Point, 'z'>[] = [], color: string = '#ff0000'): void {
        this.context.beginPath();
        this.context.fillStyle = color;
        this.context.moveTo(this.xs(points[0].x), this.ys(points[0].y));
        for (let i = 1; i < points.length; i++) {
            this.context.lineTo(this.xs(points[i].x), this.ys(points[i].y))
        }
        this.context.fill()
        this.context.closePath();
    }

    triangle(x1: number = 0, y1: number = 0, x2: number = 0, y2: number = 0, x3: number = 0, y3: number = 0, color: string = '#f00'): void {
        this.context.beginPath();
        this.context.fillStyle = color;
        this.context.moveTo(this.xs(x1), this.ys(y1));
        this.context.lineTo(this.xs(x2), this.ys(y2));
        this.context.lineTo(this.xs(x3), this.ys(y3));
        this.context.fill()
        this.context.closePath();
    }

    text = (x: number, y: number, text: string, color: string = "#000"): void => {
        this.context.font = "24pt arial";
        this.context.fillStyle = color;
        this.context.fillText(text, this.xs(x), this.ys(y));
    }
}

export default Graph;