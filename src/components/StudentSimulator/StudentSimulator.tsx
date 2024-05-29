import React, { useEffect, useRef, useState } from "react";
import RPGGame, { ERoom } from "../../modules/StudentSimulator/RPGGame";
import ActionsPanel from "./ActionsPanel/ActionsPanel";
import HealthPanel from "./HealthPanel/HealthPanel";
import Action from "../../modules/StudentSimulator/Data/Action";

const StudentSimulator: React.FC = () => {
    let title: string = '';
    let description: string = '';
    let image: string = '';
    const health = useRef<HealthPanel>(null);
    let actions: Action[] = [];
    const game: RPGGame = new RPGGame();

    const [roomId, setRoom] = useState(ERoom.start);

    const goToRoom = (name: ERoom) => {
        setRoom(name);
    }

    const room = game.getRoom(roomId);
    title = room.title;
    description = room.description;
    image = room.img;
    actions = room.actions;

    return (<div >
        <h1>Студента Жизнь</h1>
        <div>
            <span id="roomTitle">{title}</span>
        </div>
        <img id='roomImage' alt={image}></img>
        <div>
            <span id='roomDescription'>{description}</span>
        </div>
        <HealthPanel ref={health} />
        <div><ActionsPanel actions={actions} goToRoom={goToRoom} /></div>
    </div>);
}

export default StudentSimulator;