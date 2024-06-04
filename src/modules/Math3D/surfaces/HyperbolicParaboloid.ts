import { Point } from "../entities";
import Function3D from "./Function3D";

class HyperbolicParaboloid extends Function3D {
    constructor(
        a: number = 2,
        b: number = 2,
        x1: number = -4,
        x2: number = 4,
        z1: number = -4,
        z2: number = 4,
        color: string = '#88ff00',
        center: Point = new Point(),
        edgeCount: number = 32
    ) {
        super(
            (x: number, z: number) => (x / a) ** 2 - (z / b) ** 2,
            x1,
            x2,
            z1,
            z2,
            color,
            center,
            edgeCount
        );
    }
}

export default HyperbolicParaboloid;