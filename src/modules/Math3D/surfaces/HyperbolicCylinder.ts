import { Edge, Point, Polygon, Surface } from "../entities";

class HyperbolicCylinder extends Surface {
    constructor(
        a: number = 1,
        b: number = 1,
        x1: number = -5,
        x2: number = 5,
        z1: number = -5,
        z2: number = 5,
        height: number = 5,
        color: string = '#8800ff',
        center: Point = new Point(),
        edgeCount: number = 32
    ) {
        const vertices: Point[] = [];
        const edges: Edge[] = [];
        const polygons: Polygon[] = [];

        for (let i = 0; i < edgeCount; i++) {
            for (let j = 0; j < edgeCount; j++) {
                const y: number = j * height / (edgeCount - 1) - height / 2;
                const z: number = i * (z2 - z1) / (edgeCount - 1) + z1 + center.z;
                const x: number = a * Math.sqrt(1 + (z / b) * (z / b))
                vertices.push(new Point(x, y, z));
                vertices.push(new Point(-x, y, z));
            }
        }

        for (let k = 0; k < 2; k++) {
            for (let i = 1; i < edgeCount; i++) {
                for (let j = 1; j < edgeCount; j++) {
                    edges.push(new Edge(2 * (j * edgeCount + i - 1) + k, 2 * (j * edgeCount + i) + k));
                    edges.push(new Edge(2 * ((j - 1) * edgeCount + i) + k, 2 * (j * edgeCount + i) + k));
                }
                edges.push(new Edge(2 * (i - 1) + k, 2 * i + k));
                edges.push(new Edge(2 * (i - 1) * edgeCount + k, 2 * i * edgeCount + k));
            }
        }

        for (let k = 0; k < 2; k++) {
            for (let i = 1; i < edgeCount; i++) {
                for (let j = 1; j < edgeCount; j++) {
                    polygons.push(new Polygon([
                        2 * (j * edgeCount + i - 1) + k,
                        2 * (j * edgeCount + i) + k,
                        2 * ((j - 1) * edgeCount + i) + k,
                        2 * ((j - 1) * edgeCount + i - 1) + k
                    ], color));
                }
            }
        }

        super(vertices, edges, polygons, center);
    }
}

export default HyperbolicCylinder;