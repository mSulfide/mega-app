import React, { useEffect, useRef } from "react";
import RPGGame from "../../modules/StudentSimulator/RPGGame";
import ActionsPanel from "./ActionsPanel/ActionsPanel";
import HealthPanel from "./HealthPanel/HealthPanel";

const StudentSimulator: React.FC = () => {
    const title = useRef<HTMLSpanElement>(null);
    const description = useRef<HTMLSpanElement>(null);
    const image = useRef<HTMLImageElement>(null);
    const health = useRef<HealthPanel>(null);
    const actions = useRef<ActionsPanel>(null);

    useEffect(() => {
        new RPGGame({
            title: title.current,
            description: description.current,
            image: image.current,
            health: health.current,
            actions: actions.current
        });
    });

    return (<div >
        <h1>Студента Жизнь</h1>
        <div>
            <span ref={title} id="roomTitle"></span>
        </div>
        <img ref={image} id='roomImage' alt=''></img>
        <div>
            <span ref={description} id='roomDescription'></span>
        </div>
        <HealthPanel ref={health} />
        <div><ActionsPanel ref={actions} actions={[]} /></div>
    </div>);
}

export default StudentSimulator;