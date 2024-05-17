import AnyType from "../types/AnyType";
import Matrix from "../types/Matrix";
import ICalculator from "./ICalculator";
import RealCalculator from "./RealCalculator";

class MatrixCalculator implements ICalculator<Matrix> {
    calc: ICalculator<AnyType>;

    constructor(calc: ICalculator<AnyType> = new RealCalculator) {
        this.calc = calc;
    }

    add(a: Matrix, b: Matrix): Matrix {
        return new Matrix(a.values.map(
            (arr: AnyType[], i: number) => arr.map(
                (elem: AnyType, j: number) => this.calc.add(elem, b.values[i][j])
            )
        ));
    }

    sub(a: Matrix, b: Matrix): Matrix {
        return new Matrix(a.values.map(
            (arr: AnyType[], i: number) => arr.map(
                (elem: AnyType, j: number) => this.calc.sub(elem, b.values[i][j])
            )
        ));
    }

    mult(a: Matrix, b: Matrix): Matrix {
        const length: number = a.values.length;
        const c: Matrix = this.zero(length);
        for (let i = 0; i < length; i++) {
            for (let j = 0; j < length; j++) {
                let S: AnyType = this.calc.zero(length);
                for (let k = 0; k < length; k++) {
                    S = this.calc.add(
                        S,
                        this.calc.mult(
                            a.values[i][k],
                            b.values[k][j]
                        )
                    );
                }
                c.values[i][j] = S;
            }
        }
        return c;
    }

    div() {
        return null;
    }

    pow(a: Matrix, n: number) {
        return new Matrix(a.values.map(
            (arr: AnyType[]) => arr.map(
                (elem: AnyType) => this.calc.pow(elem, n)
            )
        ));
    }

    prod(a: Matrix, p: number) {
        return new Matrix(a.values.map(
            (arr: AnyType[]) => arr.map(
                (elem: AnyType) => this.calc.prod(elem, p)
            )
        ));
    }

    zero(length: number) {
        const values: AnyType[][] = [];
        for (let i = 0; i < length; i++) {
            values.push([]);
            for (let j = 0; j < length; j++) {
                values[i][j] = this.calc.zero(length);
            }
        }
        return new Matrix(values);
    }

    one(length: number) {
        const values: AnyType[][] = [];
        for (let i = 0; i < length; i++) {
            values.push([]);
            for (let j = 0; j < length; j++) {
                values[i][j] = i === j ? this.calc.one(length) : this.calc.zero(length);
            }
        }
        return new Matrix(values);
    }
}

export default MatrixCalculator;