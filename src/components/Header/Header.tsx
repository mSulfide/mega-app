import React from "react";
import { EPAGES } from "../../App";

type THeader = {
    setPageName: (name: EPAGES) => void;
}

const Header: React.FC<THeader> = (props : THeader) => {
    const { setPageName } = props;

    return (<>
        <button onClick={() => setPageName(EPAGES.GRAPH_3D)}>3D</button>
        <button onClick={() => setPageName(EPAGES.GRAPH_2D)}>2D</button>
        <button onClick={() => setPageName(EPAGES.ESSE)}>Esse</button>
        <button onClick={() => setPageName(EPAGES.STUDENT_SIMULATOR)}>Stud</button>
    </>);
}

export default Header;