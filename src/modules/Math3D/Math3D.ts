import { TWIN3D } from "../Graph/Graph";
import Point from "./entities/Point";
import Polygon, { EDistance } from "./entities/Polygon";
import Surface from "./entities/Surface";

type TMath3D = {
    WIN: TWIN3D;
}

type TMatrix = number[][];

type TVector = number[];

type TShadow = {
    isShadow: boolean;
    dark?: number;
}

export enum ETranform {
    zoom = 'zoom',
    move = 'move',
    rotateOx = 'rotateOx',
    rotateOy = 'rotateOy',
    rotateOz = 'rotateOz'
}

class Math3D {
    WIN: TWIN3D
    constructor({ WIN }: TMath3D) {
        this.WIN = WIN;
    }

    xs(point: Point): number {
        const zs = this.WIN.center.z;
        const z0 = this.WIN.camera.z;
        const x0 = this.WIN.camera.x;
        return (point.x - x0) / (point.z - z0) * (zs - z0) + x0;
    }

    ys(point: Point): number {
        const zs = this.WIN.center.z;
        const z0 = this.WIN.camera.z;
        const y0 = this.WIN.camera.x;
        return (point.y - y0) / (point.z - z0) * (zs - z0) + y0;
    }

    multMatrix(a: TMatrix, b: TMatrix): TMatrix {
        let c: TMatrix = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                let s = 0;
                for (let k = 0; k < 4; k++) {
                    s += a[i][k] * b[k][j];
                }
                c[i][j] = s;
            }
        }
        return c;
    }

    multPoint(T: TMatrix, m: TVector): TVector {
        const a = [0, 0, 0, 0];
        for (let i = 0; i < T.length; i++) {
            let b = 0;
            for (let j = 0; j < m.length; j++) {
                b += T[j][i] * m[j];
            }
            a[i] = b;
        }
        return a;
    }

    [ETranform.zoom](delta: number): TMatrix {
        const T = [
            [delta, 0, 0, 0],
            [0, delta, 0, 0],
            [0, 0, delta, 0],
            [0, 0, 0, 1]
        ];
        return T;
    }

    [ETranform.move](dx: number = 0, dy: number = 0, dz: number = 0): TMatrix {
        const T = [
            [1, 0, 0, 0],
            [0, 1, 0, 0],
            [0, 0, 1, 0],
            [dx, dy, dz, 1]
        ];
        return T;
    }

    [ETranform.rotateOx](angle: number): TMatrix {
        const T = [
            [1, 0, 0, 0],
            [0, Math.cos(angle), Math.sin(angle), 0],
            [0, -Math.sin(angle), Math.cos(angle), 0],
            [0, 0, 0, 1]
        ];
        return T;
    }

    [ETranform.rotateOy](angle: number): TMatrix {
        const T = [
            [Math.cos(angle), 0, -Math.sin(angle), 0],
            [0, 1, 0, 0],
            [Math.sin(angle), 0, Math.cos(angle), 0],
            [0, 0, 0, 1]
        ];
        return T;
    }

    [ETranform.rotateOz](angle: number): TMatrix {
        const T = [
            [Math.cos(angle), Math.sin(angle), 0, 0],
            [-Math.sin(angle), Math.cos(angle), 0, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 1]
        ];
        return T;
    }

    calcDistance(surface: Surface, endPoint: Point, name: EDistance): void {
        surface.polygons.forEach(polygon => {
            let x = 0, y = 0, z = 0;
            polygon.points.forEach((index: number) => {
                x += surface.points[index].x;
                y += surface.points[index].y;
                z += surface.points[index].z;
            });
            x /= polygon.points.length;
            y /= polygon.points.length;
            z /= polygon.points.length;
            polygon[name] = Math.sqrt((endPoint.x - x) ** 2 + (endPoint.y - y) ** 2 + (endPoint.z - z) ** 2);
        });
    }

    sortByArtistAlgorithm(polygons: Polygon[]) {
        polygons.sort((a: Polygon, b: Polygon) => (a.distance < b.distance) ? 1 : -1);
    }

    calcIllumination(distance: number, lumen: number): number {
        const illum = distance ? lumen / distance ** 2 : 1;
        return illum > 1 ? 1 : illum;
    }

    transform(matrix: TMatrix, point: Point): void {
        const result = this.multPoint(matrix, [point.x, point.y, point.z, 1]);
        point.x = result[0];
        point.y = result[1];
        point.z = result[2];
    }

    getTransform(...args: TMatrix[]): TMatrix {
        return args.reduce((s, t) => this.multMatrix(s, t), [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]]);
    }
}

export default Math3D;