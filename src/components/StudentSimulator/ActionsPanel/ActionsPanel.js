import React from "react";
import Action from "../../../modules/StudentSimulator/Data/Action";

class ActionsPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = { actions: props.actions };
    }

    render() {
        const buttons = this.state.actions.map((action, index) => (
            <button key={index} onClick={action.goToRoom}>{action.title}</button>
        ));
        return (buttons);
    }
}

export default ActionsPanel;