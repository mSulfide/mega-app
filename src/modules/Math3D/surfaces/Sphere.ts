import { Point, Edge, Polygon } from "../entities"
import Elipsoid from "./Ellipsoid";

class Sphere extends Elipsoid {
    constructor(
        radius: number = 5, 
        color: string = '#ffff00', 
        center: Point = new Point(), 
        verticalEdgeCount: number = 20, 
        horizontalEdgeCount: number = 9
    ) {
        super(radius, radius, radius, color, center, verticalEdgeCount, horizontalEdgeCount);
    }
}

export default Sphere;