import React from "react";
import { ECustom } from "../Graph3D";

type TCheckbox3D = {
    text: string;
    id: string;
    custom: ECustom;
    customValue: boolean;
    changeValue: (flag: ECustom, value: boolean) => void;
}

const Checkbox3D: React.FC<TCheckbox3D> = (props: TCheckbox3D) => {
    const { text, id, custom, customValue, changeValue } = props;

    const checkboxClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { dataset, checked } = event.target;
        const flag = dataset.custom as ECustom;
        changeValue(flag, checked);
    }

    return (<>
        <label htmlFor={id}>{text}</label>
        <input
            onChange={checkboxClick}
            type="checkbox"
            data-custom={custom}
            id={id}
            defaultChecked={customValue}
        />
    </>);
}

export default Checkbox3D;