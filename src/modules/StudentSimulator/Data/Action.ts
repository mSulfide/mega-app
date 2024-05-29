import { ERoom } from "../RPGGame";

class Action {
    title: string;
    room: ERoom;
    constructor(title: string = "", aimRoom: ERoom) {
        this.title = title;
        this.room = aimRoom;
    }
}

export default Action;