import { Edge, Point, Polygon, Surface } from "../entities";

class ParabolicCylinder extends Surface {
    constructor(
        a: number = 0.5,
        x1: number = -4,
        x2: number = 4,
        width: number = 6,
        color: string = '#0000ff',
        center: Point = new Point(),
        edgeCount: number = 32
    ) {
        const vertices: Point[] = [];
        const edges: Edge[] = [];
        const polygons: Polygon[] = [];

        for (let i = 0; i < edgeCount; i++) {
            for (let j = 0; j < edgeCount; j++) {
                const eps: number = (x2 - x1) / (edgeCount - 1);
                const x: number = i * eps + x1;
                vertices.push(new Point(
                    x + center.x - (x1 + x2) / 2,
                    a * x * x + center.y,
                    j * width / (edgeCount - 1) + center.z - width / 2
                ));
            }
        }

        for (let i = 1; i < edgeCount; i++) {
            for (let j = 1; j < edgeCount; j++) {
                edges.push(new Edge(i * edgeCount + j - 1, i * edgeCount + j));
                edges.push(new Edge((i - 1) * edgeCount + j, i * edgeCount + j));
            }
            edges.push(new Edge(i - 1, i));
            edges.push(new Edge((i - 1) * edgeCount, i * edgeCount));
        }

        for (let i = 1; i < edgeCount; i++) {
            for (let j = 1; j < edgeCount; j++) {
                polygons.push(new Polygon([
                    (i - 1) * edgeCount + j - 1,
                    (i - 1) * edgeCount + j,
                    i * edgeCount + j,
                    i * edgeCount + j - 1
                ], color));
            }
        }

        super(vertices, edges, polygons, center);
    }
}

export default ParabolicCylinder;