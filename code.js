import { Game } from "./game.js";
import { GameOver } from "./gameOver.js";
import { TitleScreen } from "./titleScreen.js";
import { Toolbox } from "./toolbox.js";

let canvas = document.getElementById("myCanvas");
let pencil = canvas.getContext("2d"); // This gives you the drawing context, like a pencil
let toolbox = new Toolbox();


//make some states to go to.
let game = new Game();
let gameOver = new GameOver();
let titleScreen = new TitleScreen

let state = titleScreen;

function gameLoop() {
    state.update();
}

setInterval(gameLoop, 1000 / 60);