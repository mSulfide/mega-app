import { Edge, Point, Polygon, Surface } from "../entities";

class SingleHyp extends Surface {
    constructor(
        vCount: number = 45,
        hCount: number = 60,
        y1: number = -5,
        y2: number = 5
    ) {
        const points: Point[] = [];
        const edges: Edge[] = [];
        const polygons: Polygon[] = [];

        for (let i = 0; i < vCount; i++) {
            const y = i / vCount * (y2 - y1) + y1;
            const r = Math.sqrt(1 + y * y);
            for (let j = 0; j < hCount; j++) {
                const a = 2 * Math.PI / hCount * j;
                points.push(new Point(Math.cos(a) * r, y, Math.sin(a) * r));
            }
        }

        for (let i = 0; i < vCount; i++) {
            for (let j = 0; j < hCount; j++) {
                edges.push(new Edge(j + hCount * i, (j + 1) % hCount + hCount * i));
            }
        }
        for (let j = 0; j < hCount; j++) {
            for (let i = 0; i < vCount - 1; i++) {
                edges.push(new Edge(hCount * i + j, hCount * (i + 1) + j));
            }
        }

        const isNigger = (i: number, j: number): boolean => {
            const x = j / hCount;
            const y = i / vCount;
            return ((x - 0.5)**2 + (y - 0.25)**2 <= 0.007) || j === Math.round(hCount / 2) &&
            y < 0.25;
        }
        for (let j = 0; j < hCount; j++) {
            for (let i = 0; i < vCount - 1; i++) {
                polygons.push(new Polygon([
                    hCount * i + j,
                    hCount * i + (j + 1) % hCount,
                    hCount * (i + 1) + (j + 1) % hCount,
                    hCount * (i + 1) + j
                ], isNigger(i, j) ? '#000000' : '#ff00ff'));
            }
        }

        super(points, edges, polygons);
    }
}

export default SingleHyp;