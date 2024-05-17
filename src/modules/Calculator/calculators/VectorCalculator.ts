import AnyType from "../types/AnyType";
import Vector from "../types/Vector";
import ICalculator from "./ICalculator";
import RealCalculator from "./RealCalculator";

class VectorCalculator implements ICalculator<Vector> {
    calc: ICalculator<AnyType>;

    constructor(calc: ICalculator<AnyType> = new RealCalculator) {
        this.calc = calc;
    }

    add(a: Vector, b: Vector): Vector {
        return new Vector(a.values.map((elem, i) => this.calc.add(elem, b.values[i])));
    }

    sub(a: Vector, b: Vector): Vector {
        return new Vector(a.values.map((elem, i) => this.calc.sub(elem, b.values[i])));
    }

    mult(a: Vector, b: Vector): Vector {
        return new Vector([
            this.calc.sub(this.calc.mult(a.values[1], b.values[2]), this.calc.mult(a.values[2], b.values[1])),
            this.calc.sub(this.calc.mult(a.values[2], b.values[0]), this.calc.mult(a.values[0], b.values[2])),
            this.calc.sub(this.calc.mult(a.values[0], b.values[1]), this.calc.mult(a.values[1], b.values[0]))
        ])
    }

    div() {
        return null;
    }

    pow(a: Vector, n: number): Vector {
        let ans: Vector = a;
        for (let i = 1; i < n; i++) {
            ans = this.mult(ans, a);
        }
        return ans;
    }

    prod(a: Vector, p: number): Vector {
        return new Vector(a.values.map((elem: AnyType) => this.calc.prod(elem, p)));
    }

    zero(length: number): Vector {
        const values: AnyType[] = [];
        for (let i = 0; i < length; i++) {
            values.push(this.calc.zero());
        }
        return new Vector(values);
    }

    one(length: number): Vector {
        const values: AnyType[] = [];
        for (let i = 0; i < length; i++) {
            values.push(i === 0 ?
                this.calc.one(length) :
                this.calc.zero(length)
            );
        }
        return new Vector(values);
    }
}

export default VectorCalculator;