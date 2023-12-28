var head;

import { Head } from "./head.js";
import { HEIGHT, WIDTH, gameBoard } from "./consts.js";
import { Food } from "./food.js";
import { piecesMap } from "./pieces-map.js";

var game;

const gameLoop = () => {
  head.updatePosition();

  if (head.dead) {
    gameInit();
  }
};

const gameInit = () => {
  // set game board width and hight
  gameBoard.style.width = `${WIDTH}px`;
  gameBoard.style.height = `${HEIGHT}px`;
  gameBoard.innerHTML = "";
  piecesMap.clear();

  head = new Head();
  new Food();
};

gameInit();
game = setInterval(gameLoop, 100);
