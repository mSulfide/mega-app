import React from "react";
import Action from "../../../modules/StudentSimulator/Data/Action";
import { ERoom } from "../../../modules/StudentSimulator/RPGGame";

type TActionPanel = {
    actions: Action[];
    goToRoom: (room: ERoom) => void;
}

const ActionsPanel: React.FC<TActionPanel> = ({ actions, goToRoom }) => {
    return (<>
        {actions.map((action: Action, index: number) => (
            <button key={index} onClick={() => {
                goToRoom(action.room);
            }}>{action.title}</button>
        ))}
    </>);
}

export default ActionsPanel;