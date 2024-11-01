import { Surface, Point, Edge, Polygon } from "../entities";

class DoubleHyp extends Surface {
    constructor(
        edgeCount = 20,
        width = 10
    ) {
        const points: Point[] = [];
        const edges: Edge[] = [];
        const polygons: Polygon[] = [];

        for (let i = 0; i <= edgeCount; i++) {
            for (let j = 0; j <= edgeCount; j++) {
                const x = (i / edgeCount - 0.5) * width;
                const y = (j / edgeCount - 0.5) * width;
                points.push(new Point(x, Math.sqrt(x ** 2 + y ** 2 + 1), y));
            }
        }
        for (let i = 0; i <= edgeCount; i++) {
            for (let j = 0; j <= edgeCount; j++) {
                const x = (i / edgeCount - 0.5) * width;
                const y = (j / edgeCount - 0.5) * width;
                points.push(new Point(x, - Math.sqrt(x ** 2 + y ** 2 + 1), y));
            }
        }

        for (let i = 0; i <= edgeCount; i++) {
            for (let j = 0; j < edgeCount; j++) {
                edges.push(new Edge(i + (edgeCount + 1) * j, i + (edgeCount + 1) * (j + 1)));
            }
        }
        for (let i = 0; i < edgeCount; i++) {
            for (let j = 0; j <= edgeCount; j++) {
                edges.push(new Edge(i + (edgeCount + 1) * j, i + (edgeCount + 1) * j + 1));
            }
        }
        for (let i = 0; i <= edgeCount; i++) {
            for (let j = 0; j < edgeCount; j++) {
                edges.push(new Edge(i + (edgeCount + 1) * j + (edgeCount + 1) ** 2, i + (edgeCount + 1) * (j + 1) + (edgeCount + 1) ** 2));
            }
        }
        for (let i = 0; i < edgeCount; i++) {
            for (let j = 0; j <= edgeCount; j++) {
                edges.push(new Edge(i + (edgeCount + 1) * j + (edgeCount + 1) ** 2, i + (edgeCount + 1) * j + 1 + (edgeCount + 1) ** 2));
            }
        }

        for (let i = 0; i < edgeCount; i++) {
            for (let j = 0; j < edgeCount; j++) {
                polygons.push(new Polygon([
                    i + (edgeCount + 1) * j,
                    i + (edgeCount + 1) * (j + 1),
                    (i + 1) + (edgeCount + 1) * (j + 1),
                    (i + 1) + (edgeCount + 1) * j
                ]));
            }
        }
        for (let i = 0; i < edgeCount; i++) {
            for (let j = 0; j < edgeCount; j++) {
                polygons.push(new Polygon([
                    i + (edgeCount + 1) * j + (edgeCount + 1) ** 2,
                    i + (edgeCount + 1) * (j + 1) + (edgeCount + 1) ** 2,
                    (i + 1) + (edgeCount + 1) * (j + 1) + (edgeCount + 1) ** 2,
                    (i + 1) + (edgeCount + 1) * j + (edgeCount + 1) ** 2,
                ]));
            }
        }

        super(points, edges, polygons);
    }
}

export default DoubleHyp;