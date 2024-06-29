import { Edge, Point, Polygon, Surface } from "../entities";

class EllipticalCylinder extends Surface {
    constructor(
        a: number = 3,
        b: number = 3,
        h: number = 8,
        color: string = '#ff8800',
        center: Point = new Point(),
        verticalEdgeCount: number = 20,
        horizontalEdgeCount: number = 8
    ) {
        const vertices: Point[] = [];
        const edges: Edge[] = [];
        const polygons: Polygon[] = [];

        for (let i = 0; i < verticalEdgeCount; i++) {
            const alpha = 2 * Math.PI * i / verticalEdgeCount;
            for (let j = 0; j < horizontalEdgeCount; j++) {
                vertices.push(new Point(
                    a * Math.cos(alpha) + center.x,
                    h / (horizontalEdgeCount - 1) * j - h / 2 + center.y,
                    b * Math.sin(alpha) + center.z
                ));
            }
        }

        for (let i = 0; i < verticalEdgeCount; i++) {
            for (let j = 1; j < horizontalEdgeCount; j++) {
                edges.push(new Edge(j - 1 + i * horizontalEdgeCount, j + i * horizontalEdgeCount));
            }
            for (let j = 0; j < horizontalEdgeCount; j++) {
                edges.push(new Edge(j + i * horizontalEdgeCount, j + ((i + 1) % verticalEdgeCount) * horizontalEdgeCount));
            }
        }

        const points1: number[] = [];
        for (let i = 0; i < verticalEdgeCount; i++) {
            points1.push(i * horizontalEdgeCount);
        }
        polygons.push(new Polygon(points1, color));
        const points2: number[] = [];
        for (let i = 0; i < verticalEdgeCount; i++) {
            points2.push(i * horizontalEdgeCount + horizontalEdgeCount - 1);
        }
        polygons.push(new Polygon(points2, color));
        for (let i = 0; i < verticalEdgeCount; i++) {
            for (let j = 1; j < horizontalEdgeCount; j++) {
                polygons.push(new Polygon([
                    j - 1 + i * horizontalEdgeCount,
                    j + i * horizontalEdgeCount,
                    j + ((i + 1) % verticalEdgeCount) * horizontalEdgeCount,
                    j - 1 + ((i + 1) % verticalEdgeCount) * horizontalEdgeCount
                ], color));
            }
        }

        super(vertices, edges, polygons, center);
    }
}

export default EllipticalCylinder;