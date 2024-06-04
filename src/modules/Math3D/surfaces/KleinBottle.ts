import { Edge, Point, Polygon, Surface } from "../entities";

class KleinBottle extends Surface {
    constructor(
        radius: number = 2,
        color: string = '#ff0088',
        center: Point = new Point(),
        edgeCount: number = 64
    ) {
        const vertices: Point[] = [];
        const edges: Edge[] = [];
        const polygons: Polygon[] = [];

        for (let i = 0; i < edgeCount; i++) {
            const u = i * Math.PI * 2 / edgeCount;
            for (let j = 0; j < edgeCount; j++) {
                const v = j * Math.PI * 2 / edgeCount;
                vertices.push(new Point(
                    (radius + Math.cos(u / 2) * Math.sin(v) - Math.sin(u / 2) * Math.sin(2 * v)) * Math.cos(u),
                    (radius + Math.cos(u / 2) * Math.sin(v) - Math.sin(u / 2) * Math.sin(2 * v)) * Math.sin(u),
                    Math.sin(u / 2) * Math.sin(v) + Math.cos(u / 2) * Math.sin(2 * v)
                ));
            }
        }

        for (let i = 0; i < edgeCount; i++) {
            for (let j = 0; j < edgeCount; j++) {
                edges.push(new Edge(i * edgeCount + j, i * edgeCount + (j + 1) % edgeCount));
                edges.push(new Edge(i * edgeCount + j, i + 1 === edgeCount ? (edgeCount - j) % edgeCount : (i + 1) * edgeCount + j));
            }
        }

        for (let i = 0; i < edgeCount; i++) {
            for (let j = 0; j < edgeCount; j++) {
                polygons.push(new Polygon([
                    i * edgeCount + j,
                    i * edgeCount + (j + 1) % edgeCount,
                    i + 1 === edgeCount ? (edgeCount - j - 1) % edgeCount : (i + 1) * edgeCount + (j + 1) % edgeCount,
                    i + 1 === edgeCount ? (edgeCount - j) % edgeCount : (i + 1) * edgeCount + j
                ], color));
            }
        }

        super(vertices, edges, polygons, center);
    }
}

export default KleinBottle;