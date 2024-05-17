import React, { useRef } from "react";
import useCalculator from "../../modules/Calculator/useCalculator";
import { EOperand } from "../../modules/Calculator/calculators/Calculator";

const Calc: React.FC = () => {
    const refA = useRef<HTMLTextAreaElement>(null);
    const refB = useRef<HTMLTextAreaElement>(null);
    const refC = useRef<HTMLTextAreaElement>(null);

    const calc = useCalculator(refA, refB, refC);

    return (<div>
        <textarea ref={refA} placeholder="a"></textarea>
        <textarea ref={refB} placeholder="b"></textarea>
        <textarea ref={refC} placeholder="result"></textarea>
        <button className="operand" onClick={() => calc(EOperand.add)}>+</button>
        <button className="operand" onClick={() => calc(EOperand.sub)}>-</button>
        <button className="operand" onClick={() => calc(EOperand.mult)}>*</button>
        <button className="operand" onClick={() => calc(EOperand.div)}>/</button>
        <button className="operand" onClick={() => calc(EOperand.pow)}>^</button>
    </div>);
}

export default Calc;