import React, { useState } from "react";
import { TFunction } from "../Graph2D";
import Func from "./Func/Func";

type TUI2D = {
    funcs: TFunction[];
    reRender: () => void;
}

const UI2D: React.FC<TUI2D> = (props: TUI2D) => {
    const { funcs, reRender } = props;
    const [count, setCount] = useState(funcs.length);

    const addFunction = () => {
        const func: TFunction = {
            f: () => 0,
            color: "#000000",
            lineWidth: 2
        }
        funcs.push(func);
        setCount(funcs.length);
    }

    return (<>
        <button onClick={addFunction}>+</button>
        <div>{
        funcs.map((func, index) =>
                <Func
                    key={index}
                    func={func}
                    reRender={reRender}
                />
            )
        }</div>
    </>);
}

export default UI2D;