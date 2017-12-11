import { Game } from "./app/index";

const gameSettings = {
    camera: {
        x: -1650,
        y: 1500,
        z: 1500,
    },
};

const game = new Game(gameSettings);
game.start();
