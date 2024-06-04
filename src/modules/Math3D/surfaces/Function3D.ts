import { Edge, Point, Polygon, Surface } from "../entities";

export type TF3D = (x: number, z: number) => number;

class Function3D extends Surface {
    constructor(
        f: TF3D = () => 0,
        x1: number = -4,
        x2: number = 4,
        z1: number = -4,
        z2: number = 4,
        color: string = '#8800ff',
        center: Point = new Point(),
        edgeCount: number = 32
    ) {
        const vertices: Point[] = [];
        const edges: Edge[] = [];
        const polygons: Polygon[] = [];

        for (let i = 0; i < edgeCount; i++) {
            for (let j = 0; j < edgeCount; j++) {
                const x: number = j * (x2 - x1) / (edgeCount - 1) + x1 + center.x;
                const z: number = i * (z2 - z1) / (edgeCount - 1) + z1 + center.z;
                vertices.push(new Point(x, f(x, z) + center.y, z));
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

export default Function3D;