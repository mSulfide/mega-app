class Action {
    constructor(title = "", goToRoom = () => { }) {
        this.title = title;
        this.goToRoom = goToRoom;
    }
}

export default Action;