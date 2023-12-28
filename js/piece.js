import { PIECE_SIZE, WIDTH, HEIGHT, gameBoard } from "./consts.js";
import { piecesMap } from "./pieces-map.js";

export class Piece {
  _x;
  _y;
  element;

  set x(value) {
    this._x = value;
    this.element.style.left = `${value}px`;
  }

  get x() {
    return this._x;
  }

  set y(value) {
    this._y = value;
    this.element.style.top = `${value}px`;
  }

  get y() {
    return this._y;
  }

  constructor(options) {
    this.generateElement();
    this.setRandomPosition();

    piecesMap.add(this);
  }

  generateElement() {
    const div = document.createElement("div");
    div.className = "piece";
    div.style.width = `${PIECE_SIZE}px`;
    div.style.height = `${PIECE_SIZE}px`;

    gameBoard.appendChild(div);

    this.element = div;
  }

  setRandomPosition() {
    const maxX = WIDTH - PIECE_SIZE;
    const maxY = HEIGHT - PIECE_SIZE;
    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);
    this.x = Math.floor(randomX / PIECE_SIZE) * PIECE_SIZE;
    this.y = Math.floor(randomY / PIECE_SIZE) * PIECE_SIZE;
  }
}
