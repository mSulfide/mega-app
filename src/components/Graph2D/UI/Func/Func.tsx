import { KeyboardEvent } from "react";
import { TF, TFunction } from "../../Graph2D";

type TFunc = {
    func: TFunction;
    reRender: () => void;
}

const Func: React.FC<TFunc> = (props: TFunc) => {
    const { func, reRender } = props;

    const changeFunction = (event: KeyboardEvent<HTMLInputElement>) => {
        try {
            let f: TF = () => 0;
            eval(`f = x => ${event.currentTarget.value};`);
            func.f = f;
            reRender();
        } catch (e) {
            console.log(e);
        }
    }

    const changeColor = (event: KeyboardEvent<HTMLInputElement>) => {
        func.color = event.currentTarget.value;
        reRender();
    }

    const changeWidth = (event: KeyboardEvent<HTMLInputElement>) => {
        func.lineWidth = parseInt(event.currentTarget.value);
        reRender();
    }

    return (<div>
        <input placeholder="f(x)" onKeyUp={(event) => changeFunction(event)} />
        <input placeholder="color" onKeyUp={(event) => changeColor(event)} />
        <input placeholder="width" onKeyUp={(event) => changeWidth(event)} />
    </div>);
}

export default Func;