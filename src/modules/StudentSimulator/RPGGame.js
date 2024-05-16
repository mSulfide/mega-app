import Action from "./Data/Action";
import Location from "./Data/Location";

class RPGGame {
    constructor(props) {
        const { title, description, image, health, actions } = props;
        this.title = title;
        this.description = description;
        this.image = image;
        this.health = health;
        this.actions = actions;
        this.student = {
            health: 100,
            money: 0
        };
        //() => { this.goToRoom(this.rooms[""]) }
        this.rooms = {
            start: new Location("Общага", "Очень хорошее место", "", [
                new Action("Коридор", () => { this.goToRoom(this.rooms["hall"]) }),
                new Action("Окно", () => { 
                    this.student.health -= 100;
                    this.goToRoom(this.rooms["window"]);
                })
            ]),
            window: new Location("Окно", "", "", []),
            hall: new Location("Коридор", "", "", [
                new Action('Комната в общаге', () => { this.goToRoom(this.rooms["start"]) }),
                new Action('Вахта', () => { this.goToRoom(this.rooms["watch"]) }),
                new Action('Кухня', () => { 
                    this.student.health += 25;
                    this.goToRoom(this.rooms["kitchen"]);
                }),
                new Action('Туалет', () => { 
                    this.student.health += 5;
                    this.goToRoom(this.rooms["wc"]);
                })
            ]),
            watch: new Location('Вахта', 'Место где на тебя хоть кто-то смотрит', '', [
                new Action('Коридор', () => {
                    this.student.health -= 5;
                    this.goToRoom(this.rooms["hall"]);
                }),
                new Action('Университет', () => { 
                    this.student.health -= 15;
                    this.goToRoom(this.rooms["univer"]);
                }),
                new Action('КБ', () => { 
                    this.student.health += 50;
                    this.goToRoom(this.rooms["kb"]);
                })
            ]),
            kitchen: new Location('Кухня', 'Вы подкрепились белком, более не живущим на кухне', '', [
                new Action('Коридор', () => { this.goToRoom(this.rooms["hall"]) })
            ]),
            wc: new Location('Туалет', 'Зайти легко, а выход не всегда просто', '', [
                new Action('Коридор', () => { 
                    this.student.health -= 40;
                    this.goToRoom(this.rooms["hall"]);
                })
            ]),
            univer: new Location('Университет', '', '', [
                new Action('Общага', () => { 
                    this.student.health -= 30;
                    this.goToRoom(this.rooms["watch"]);
                }),
                new Action('КБ', () => {
                    this.student.health += 5;
                    this.goToRoom(this.rooms["kb"]); 
                }),
                new Action('Лекция', () => { 
                    this.student.health -= 90;
                    this.goToRoom(this.rooms["lection"]); 
                }),
                new Action('Практика', () => { 
                    this.student.health -= 120;
                    this.goToRoom(this.rooms["praktika"]);
                })
            ]),
            kb: new Location('КБ', 'Всё таки: Красное или белое?', '', [
                new Action('Общага', () => { this.goToRoom(this.rooms["watch"]) }),
                new Action('Университет', () => { 
                    this.student.health -= 20;
                    this.goToRoom(this.rooms["univer"]);
                })
            ]),
            lection: new Location('Лекция', 'Вы преобрели немного знаний, но устали', '', [
                new Action('Холл', () => { this.goToRoom(this.rooms["univer"]) })
            ]),
            praktika: new Location('Практика', 'Вы не готовы к практике. На вас накричали и вы ушли грустным', '', [
                new Action('Холл', () => { this.goToRoom(this.rooms["univer"]) })
            ])
        }
        this.goToRoom(this.rooms["start"]);
    }

    goToRoom(room) {
        this.title.innerHTML = room.title;
        this.image.src = room.img;
        this.description.innerHTML = room.description;
        this.health.setState({ health: this.student.health });
        this.actions.setState({ actions: room.actions });
    }
}

export default RPGGame;