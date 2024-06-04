import { Point } from "../entities";
import Function3D from "./Function3D";

class ParabolicCylinder extends Function3D {
    constructor(
        a: number = 0.5,
        x1: number = -4,
        x2: number = 4,
        width: number = 6,
        color: string = '#0000ff',
        center: Point = new Point(),
        edgeCount: number = 32
    ) {

        super(
            (x: number, z: number) => a * x * x,
            x1, x2, -width / 2, width / 2, color, center, edgeCount
        );
    }
}

export default ParabolicCylinder;