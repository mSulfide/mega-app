import AnyType from "./AnyType";

class Member {
    value: number;
    power: number;
    constructor (value: number = 0, power: number = 0) {
        this.value = value;
        this.power = power;
    }

    toString(): string {
        return this.value ? `${this.value}*x^${this.power}` : '0';
    }
}

export default Member;