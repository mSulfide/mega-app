import { Point, Edge, Polygon, Surface } from "../entities"

class Pyramid extends Surface {
    constructor(
        radius: number = 2.5,
        edgeCount: number = 4,
        heigth: number = 5,
        color: string = '#00ff00',
        center: Point = new Point()
    ) {
        const vertices: Point[] = [];
        const edges: Edge[] = [];
        const polygons: Polygon[] = [];

        for (let i = 0; i < edgeCount; i++) {
            const alpha = (1 - (edgeCount - 2) / edgeCount) * Math.PI * i;
            vertices.push(new Point(
                Math.sin(alpha) * radius,
                -heigth / 3,
                Math.cos(alpha) * radius
            ));
        }
        vertices.push(new Point(0, heigth / 3 * 2, 0));

        for (let i = 0; i < edgeCount; i++) {
            edges.push(new Edge(i, (i + 1) % edgeCount));
            edges.push(new Edge(i, edgeCount));
        }

        const points: number[] = [];
        for (let i = 0; i < edgeCount; i++) {
            polygons.push(new Polygon([
                i,
                (i + 1) % edgeCount,
                edgeCount
            ], color));
            points.push(i);
        }
        polygons.push(new Polygon(points, color));

        super(vertices, edges, polygons, center);
    }
}

export default Pyramid;