import Complex from "../types/Complex";
import ICalculator from "./ICalculator";

class ComplexCalculator implements ICalculator<Complex> {
    add(a: Complex, b: Complex): Complex {
        return new Complex(a.re + b.re, a.im + b.im);
    }

    sub(a: Complex, b: Complex): Complex {
        return new Complex(a.re - b.re, a.im - b.im);
    }

    mult(a: Complex, b: Complex): Complex {
        return new Complex(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
    }

    inv(a: Complex): Complex {
        const q = a.re * a.re + a.im * a.im;
        return new Complex(a.re / q, -a.im / q);
    }

    div(a: Complex, b: Complex): Complex {
        return this.mult(a, this.inv(b));
    }

    prod(a: Complex, p: number): Complex {
        return new Complex(a.re * p, a.im * p);
    }

    pow(a: Complex, n: number): Complex {
        let z = this.one();
        for (let i = 0; i < n; i++) z = this.mult(z, a);
        return z;
    }

    one(): Complex {
        return new Complex(1);
    }

    zero(): Complex {
        return new Complex();
    }
}

export default ComplexCalculator;