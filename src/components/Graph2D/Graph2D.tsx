import React, { useEffect } from "react";
import UI2D from "./UI/UI2D";
import Graph from "../../modules/Graph/Graph";

export type TF = (x: number) => number;

export type TFunction = {
    f: TF;
    color: string;
    lineWidth: number;
}

const Graph2D: React.FC = () => {
    let graph: Graph | null = null;
    const WIN = {
        left: -10,
        bottom: -10,
        width: 20,
        height: 20
    };
    const funcs: TFunction[] = [];
    let canMove: boolean = false;

    const mouseup = (): void => {
        canMove = false;
    }

    const mouseleave = (): void => {
        canMove = false;
    }

    const mousedown = (): void => {
        canMove = true;
    }

    const mousemove = (event: MouseEvent): void => {
        if (canMove && graph) {
            WIN.left -= graph.sx(event.movementX);
            WIN.bottom -= graph.sy(event.movementY);
            update();
        }
    }

    const wheel = (event: WheelEvent): void => {
        const zoomStep = 0.4;
        const delta = (event.deltaY > 0) ? zoomStep : -zoomStep;
        if (WIN.width + delta >= 0) {
            WIN.width += delta;
            WIN.height += delta;
            WIN.left -= delta / 2;
            WIN.bottom -= delta / 2;
            update();
        }
    }

    const printFunction = ({ f, color = "#4B4B4B", lineWidth = 2 }: TFunction): void => {
        if (graph) {
            const precision = 2000;
            let x = WIN.left;
            let dx = WIN.width / precision;
            while (x <= WIN.width + WIN.left) {
                if (Math.abs(f(x) - f(x + dx)) >= WIN.height) {
                    x += dx;
                    continue;
                }
                graph.line(x, f(x), x + dx, f(x + dx), color, lineWidth);
                x += dx;
            }
        }
    }

    const printFunctionText = (f: TF): void => {
        if (graph) {
            let text = f.toString();
            text = text.replaceAll('x =>', '');
            graph.text(1.2, f(1), 'y =' + text);
        }
    }

    const printZeroes = ({ f, color = "#f00", lineWidth = 2 }: TFunction): void => {
        if (graph) {
            const precision = 100;
            let x = WIN.left;
            let dx = WIN.width / precision;
            while (x <= WIN.width + WIN.left) {
                let zero = getZero(f, x, x + dx);
                if (zero)
                    graph.point(zero, 0, color, lineWidth);
                x += dx;
            }
        }
    }

    const printAxes = (color: string = "#2A2A2A"): void => {
        if (graph) {
            const cellsColor = "#AAAAAA";
            const axesWidth = 2;
            const markupLenght = 0.2;
            const arrowLenght = 0.05;
            const top = WIN.bottom + WIN.height;
            const right = WIN.left + WIN.width;
            graph.line(0, WIN.bottom, 0, top, color, axesWidth);
            graph.line(WIN.left, 0, right, 0, color, axesWidth);
            for (let i = 1; i < right; i++) {
                graph.line(i, WIN.bottom, i, top, cellsColor);
                graph.line(i, -markupLenght, i, markupLenght, color);
            }
            for (let i = 1; i < top; i++) {
                graph.line(WIN.left, i, right, i, cellsColor);
                graph.line(-markupLenght, i, markupLenght, i, color);
            }
            for (let i = -1; i > WIN.left; i--) {
                graph.line(i, WIN.bottom, i, top, cellsColor);
                graph.line(i, -markupLenght, i, markupLenght, color);
            }
            for (let i = -1; i > WIN.bottom; i--) {
                graph.line(WIN.left, i, right, i, cellsColor);
                graph.line(-markupLenght, i, markupLenght, i, color);
            }
            const arrowOffset = arrowLenght * WIN.width / 2;
            graph.line(0, top, arrowOffset, top - arrowOffset, color, axesWidth);
            graph.line(0, top, -arrowOffset, top - arrowOffset, color, axesWidth);
            graph.line(right, 0, right - arrowOffset, arrowOffset, color, axesWidth);
            graph.line(right, 0, right - arrowOffset, -arrowOffset, color, axesWidth);
        }
    }

    const update = () => {
        if (graph) {
            graph.clear()
            printAxes();
            funcs.forEach(func => {
                if (func) {
                    printFunction(func);
                    printZeroes(func);
                }
            });
        }
    }

    const getZero = (f: TF, a: number, b: number, eps: number = 0.0001): number | null => {
        if (f(a) * f(b) > 0) return null;
        if (Math.abs(f(a) - f(b)) < eps) return (a + b) / 2;
        const half = (a + b) / 2;
        if (f(a) * f(half) <= 0) return getZero(f, a, half, eps);
        if (f(half) * f(b) <= 0) return getZero(f, half, b, eps);
        return null;
    }

    const getDerivativeK = (f: TF, x: number, eps: number = 0.0001): number => (f(x + eps) - f(x)) / eps;

    useEffect(() => {
        graph = new Graph({
            WIN,
            id: 'canvas2D',
            width: 500,
            height: 500,
            callbacks: { wheel, mousemove, mouseleave, mouseup, mousedown }
        });
        update();

        return () => {
            graph = null;
        }
    }, [graph]);

    return (<div>
        <canvas
            id="canvas2D"
            width="400"
            height="400">
        </canvas>
        <UI2D funcs={funcs} reRender={update} />
    </div>);
}

export default Graph2D;