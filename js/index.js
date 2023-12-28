var head;

import { Head } from "./head.js";
import { HEIGHT, WIDTH, gameBoard } from "./consts.js";
import { Food } from "./food.js";

const gameLoop = () => {
  head.updatePosition();
};

const gameInit = () => {
  // set game board width and hight
  gameBoard.style.width = `${WIDTH}px`;
  gameBoard.style.height = `${HEIGHT}px`;

  head = new Head();
  new Food();
};

gameInit();
setInterval(gameLoop, 100);
