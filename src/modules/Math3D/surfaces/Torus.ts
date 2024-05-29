import { Point, Edge, Polygon, Surface } from "../entities"

class Torus extends Surface {
    constructor(
        radius: number = 2, 
        offset: number = 5, 
        color: string = '#ff00ff', 
        center: Point = new Point(),
        verticalEdgeCount: number = 20,
        horizontalEdgeCount: number = 15

    ) {
        const vertices: Point[] = [];
        const edges: Edge[] = [];
        const polygons: Polygon[] = [];

        for (let i = 0; i < verticalEdgeCount; i++) {
            const alpha = 2 * Math.PI * i / verticalEdgeCount;
            for (let j = 0; j < horizontalEdgeCount; j++) {
                const beta = 2 * Math.PI * j / horizontalEdgeCount;
                vertices.push(new Point(
                    radius * Math.sin(beta) * Math.cos(alpha) + offset * Math.cos(alpha) + center.x,
                    radius * Math.cos(beta) + center.y,
                    radius * Math.sin(alpha) * Math.sin(beta) + offset * Math.sin(alpha) + center.z
                ));
            }
        }

        //vertical edges
        for (let i = 0; i < verticalEdgeCount; i++) {
            for (let j = 1; j < horizontalEdgeCount; j++) {
                edges.push(new Edge(horizontalEdgeCount * i + j - 1, horizontalEdgeCount * i + j));
            }
            edges.push(new Edge(horizontalEdgeCount * i, horizontalEdgeCount * (i + 1) - 1));
        }
        //horizontal edges
        for (let j = 0; j < horizontalEdgeCount; j++) {
            for (let i = 1; i < verticalEdgeCount; i++) {
                edges.push(new Edge(horizontalEdgeCount * (i - 1) + j, horizontalEdgeCount * i + j));
            }
            edges.push(new Edge(j, horizontalEdgeCount * (verticalEdgeCount - 1) + j));
        }

        for (let i = 0; i < verticalEdgeCount; i++) {
            for (let j = 0; j < horizontalEdgeCount; j++) {
                polygons.push(new Polygon([
                    j + i * horizontalEdgeCount,
                    (j + 1) % horizontalEdgeCount + i * horizontalEdgeCount,
                    (j + 1) % horizontalEdgeCount + (i + 1) % verticalEdgeCount * horizontalEdgeCount,
                    j + (i + 1) % verticalEdgeCount * horizontalEdgeCount
                ], color));
            }
        }

        super(vertices, edges, polygons, center);
    }
}

export default Torus;