import React from "react";

class HealthPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = { health: 0 };
    }

    render() {
        return (<span>{this.state.health}</span>);
    }
}

export default HealthPanel;