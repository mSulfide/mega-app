import Action from "./Data/Action";
import Location from "./Data/Location";

export enum ERoom {
    start = 'start',
    window = 'window',
    hall = 'hall',
    watch = 'watch',
    kitchen = 'kitchen',
    wc = 'wc',
    univer = 'univer',
    kb = 'kb',
    lection = 'lection',
    praktika = 'praktika'
}

class RPGGame {
    rooms = {
        start: new Location("Общага", "Очень хорошее место", "", [
            new Action("Коридор", ERoom.hall),
            new Action("Окно", ERoom.window)
        ]),
        window: new Location("Окно", "", "", []),
        hall: new Location("Коридор", "", "", [
            new Action('Комната в общаге', ERoom.start),
            new Action('Вахта', ERoom.watch),
            new Action('Кухня', ERoom.kitchen),
            new Action('Туалет', ERoom.wc)
        ]),
        watch: new Location('Вахта', 'Место где на тебя хоть кто-то смотрит', '', [
            new Action('Коридор', ERoom.hall),
            new Action('Университет', ERoom.univer),
            new Action('КБ', ERoom.kb)
        ]),
        kitchen: new Location('Кухня', 'Вы подкрепились белком, более не живущим на кухне', '', [
            new Action('Коридор', ERoom.hall)
        ]),
        wc: new Location('Туалет', 'Зайти легко, а выход не всегда просто', '', [
            new Action('Коридор', ERoom.hall)
        ]),
        univer: new Location('Университет', '', '', [
            new Action('Общага', ERoom.hall),
            new Action('КБ', ERoom.kb),
            new Action('Лекция', ERoom.lection),
            new Action('Практика', ERoom.praktika)
        ]),
        kb: new Location('КБ', 'Всё таки: Красное или белое?', '', [
            new Action('Общага', ERoom.watch),
            new Action('Университет', ERoom.univer)
        ]),
        lection: new Location('Лекция', 'Вы преобрели немного знаний, но устали', '', [
            new Action('Холл', ERoom.univer)
        ]),
        praktika: new Location('Практика', 'Вы не готовы к практике. На вас накричали и вы ушли грустным', '', [
            new Action('Холл', ERoom.univer)
        ])
    }

    getRoom(room: ERoom): Location {
        return this.rooms[room];
    }
}

export default RPGGame;