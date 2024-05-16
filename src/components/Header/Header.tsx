import React from "react";
import { EPages } from "../../App";

type THeader = {
    setPageName: (name: EPages) => void;
}

const Header: React.FC<THeader> = (props : THeader) => {
    const { setPageName } = props;

    return (<>
        <button onClick={() => setPageName(EPages.graph3D)}>3D</button>
        <button onClick={() => setPageName(EPages.graph2D)}>2D</button>
        <button onClick={() => setPageName(EPages.esse)}>Esse</button>
        <button onClick={() => setPageName(EPages.studentSimulator)}>Stud</button>
    </>);
}

export default Header;