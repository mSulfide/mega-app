import AnyType from "./AnyType";

class Matrix {
    values: AnyType[][];
    constructor(values: AnyType[][] = []) {
        this.values = [];
        values.forEach((arr: AnyType[], i: number) => {
            this.values[i] = [];
            arr.forEach((el: AnyType) => this.values[i].push(el))
        });
    }

    toString(): string {
        return this.values.map((arr: AnyType[]) =>
            arr.map((el: AnyType) => el.toString()).join(' ')
        ).join('\n');
    }
}

export default Matrix;