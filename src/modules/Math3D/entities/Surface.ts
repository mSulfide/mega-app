import Math3D, { ETransform } from "../Math3D";
import Edge from "./Edge";
import Point from "./Point";
import Polygon from "./Polygon";

class Surface {
    points: Point[];
    edges: Edge[];
    polygons: Polygon[];
    center: Point;

    constructor(points: Point[] = [], edges: Edge[] = [], polygons: Polygon[] = [], center: Point = new Point) {
        this.points = points;
        this.edges = edges;
        this.polygons = polygons;
        this.center = center;
    }
}

export default Surface;