import { Point, Edge, Polygon, Surface } from "../entities"

class Cone extends Surface {
    constructor(
        radius: number = 2.5,
        heigth: number = 5,
        color: string = '#ff0000',
        center: Point = new Point(),
        verticalEdgeCount: number = 20,
        horizontalEdgeCount: number = 9
    ) {
        const vertices: Point[] = [];
        const edges: Edge[] = [];
        const polygons: Polygon[] = [];

        vertices.push(new Point(0, -heigth / 3, 0));
        for (let j = 0; j < horizontalEdgeCount; j++) {
            const h = j / horizontalEdgeCount;
            for (let i = 0; i < verticalEdgeCount; i++) {
                const alpha = 2 * Math.PI * i / verticalEdgeCount;
                vertices.push(new Point(
                    Math.sin(alpha) * radius * (1 - h),
                    h * heigth - heigth / 3,
                    Math.cos(alpha) * radius * (1 - h)
                ));
            }
        }
        vertices.push(new Point(0, 2 * heigth / 3, 0));

        for (let i = 0; i < verticalEdgeCount; i++) {
            edges.push(new Edge(0, i + 1));
        }
        for (let i = 0; i < verticalEdgeCount; i++) {
            for (let j = 0; j < horizontalEdgeCount - 1; j++) {
                edges.push(new Edge(j * verticalEdgeCount + 1 + i, (j + 1) * verticalEdgeCount + 1 + i))
            }
            edges.push(new Edge(verticalEdgeCount * (horizontalEdgeCount - 1) + i + 1, verticalEdgeCount * horizontalEdgeCount + 1));
        }
        for (let j = 0; j < horizontalEdgeCount; j++) {
            for (let i = 0; i < verticalEdgeCount - 1; i++) {
                edges.push(new Edge(i + 1 + j * verticalEdgeCount, i + 2 + j * verticalEdgeCount));
            }
            edges.push(new Edge(verticalEdgeCount + j * verticalEdgeCount, j * verticalEdgeCount + 1));
        }

        for (let i = 0; i < verticalEdgeCount; i++) {
            polygons.push(new Polygon([
                i + 1,
                0,
                (i + 1) % verticalEdgeCount + 1
            ], color));
        }
        for (let i = 0; i < verticalEdgeCount; i++) {
            for (let j = 0; j < horizontalEdgeCount - 1; j++) {
                polygons.push(new Polygon([
                    i + 1 + verticalEdgeCount * j,
                    verticalEdgeCount * (j + 1) + i + 1,
                    verticalEdgeCount * (j + 1) + (i + 1) % verticalEdgeCount + 1,
                    (i + 1) % verticalEdgeCount + 1 + verticalEdgeCount * j
                ], color));
            }
            polygons.push(new Polygon([
                i + 1 + verticalEdgeCount * (horizontalEdgeCount - 1),
                verticalEdgeCount * horizontalEdgeCount + 1,
                (i + 1) % verticalEdgeCount + 1 + verticalEdgeCount * (horizontalEdgeCount - 1)
            ], color));
        }

        super(vertices, edges, polygons, center);
    }
}

export default Cone;