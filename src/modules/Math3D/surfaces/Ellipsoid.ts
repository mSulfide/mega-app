import { Point, Edge, Polygon, Surface } from "../entities"

class Elipsoid extends Surface {
    constructor(
        a: number = 7,
        b: number = 5,
        c: number = 3,
        color: string = '#00ffff', 
        center: Point = new Point(), 
        verticalEdgeCount: number = 20, 
        horizontalEdgeCount: number = 9
    ) {
        const vertices: Point[] = [];
        const edges: Edge[] = [];
        const polygons: Polygon[] = [];

        vertices.push(new Point(center.x, b + center.y, center.z));
        for (let i = 0; i < verticalEdgeCount; i++) {
            const alpha = 2 * Math.PI * i / verticalEdgeCount;
            for (let j = 1; j < horizontalEdgeCount; j++) {
                const beta = Math.PI * j / horizontalEdgeCount;
                vertices.push(new Point(
                    a * Math.sin(beta) * Math.cos(alpha) + center.x,
                    b * Math.cos(beta) + center.y,
                    c * Math.sin(alpha) * Math.sin(beta) + center.z
                ));
            }
        }
        vertices.push(new Point(center.x, -b + center.y, center.z));

        for (let i = 0; i < verticalEdgeCount; i++) {
            edges.push(new Edge(0, i * (horizontalEdgeCount - 1) + 1));
            for (let j = 1; j < horizontalEdgeCount - 1; j++) {
                edges.push(new Edge(j + i * (horizontalEdgeCount - 1), j + i * (horizontalEdgeCount - 1) + 1));
            }
            edges.push(new Edge((i + 1) * (horizontalEdgeCount - 1), (horizontalEdgeCount - 1) * verticalEdgeCount + 1));
        }
        for (let j = 1; j < horizontalEdgeCount; j++) {
            for (let i = 0; i < verticalEdgeCount; i++) {
                edges.push(new Edge(i * (horizontalEdgeCount - 1) + j, (i + 1) % verticalEdgeCount * (horizontalEdgeCount - 1) + j));
            }
        }

        for (let i = 0; i < verticalEdgeCount; i++) {
            polygons.push(new Polygon([
                0,
                i * (horizontalEdgeCount - 1) + 1,
                (i + 1) % verticalEdgeCount * (horizontalEdgeCount - 1) + 1
            ], color));
            for (let j = 1; j < horizontalEdgeCount - 1; j++) {
                polygons.push(new Polygon([
                    j + i * (horizontalEdgeCount - 1),
                    j + i * (horizontalEdgeCount - 1) + 1,
                    (i + 1) % verticalEdgeCount * (horizontalEdgeCount - 1) + j + 1,
                    (i + 1) % verticalEdgeCount * (horizontalEdgeCount - 1) + j
                ], color));
            }
            polygons.push(new Polygon([
                (horizontalEdgeCount - 1) * ((i + 1) % verticalEdgeCount + 1),
                (horizontalEdgeCount - 1) * (i + 1),
                (horizontalEdgeCount - 1) * verticalEdgeCount + 1
            ], color));
        }

        super(vertices, edges, polygons, center);
    }
}

export default Elipsoid;