class Location {
    title = '';
    description = '';
    img = '';
    actions = [];
    constructor(title, description, img, actions) {
        this.title = title;
        this.description = description;
        this.img = img;
        this.actions = actions;
    }
}

export default Location;