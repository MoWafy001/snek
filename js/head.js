import { Piece } from "./piece.js";
import { HEIGHT, PIECE_SIZE, WIDTH } from "./consts.js";
import { Food } from "./food.js";
import { piecesMap } from "./pieces-map.js";

export class Head extends Piece {
  xSpeed = 0;
  ySpeed = 0;

  constructor(options) {
    super(options);
    this.element.id = "head";

    this.setMovementListeners();
  }

  setMovementListeners() {
    document.addEventListener("keydown", (event) => {
      switch (event.key) {
        case "ArrowUp":
          this.xSpeed = 0;
          this.ySpeed = -1;
          break;
        case "ArrowDown":
          this.xSpeed = 0;
          this.ySpeed = 1;
          break;
        case "ArrowLeft":
          this.xSpeed = -1;
          this.ySpeed = 0;
          break;
        case "ArrowRight":
          this.xSpeed = 1;
          this.ySpeed = 0;
          break;
      }
    });
  }

  updatePosition() {
    const nextX = this.x + this.xSpeed * PIECE_SIZE;
    const nextY = this.y + this.ySpeed * PIECE_SIZE;

    if (nextX >= 0 && nextX < WIDTH && nextY >= 0 && nextY < HEIGHT) {
      this.x = nextX;
      this.y = nextY;
    }

    this.checkCollision();
  }

  checkCollision() {
    const collidedWithElement = piecesMap.findCollision(this);
    if (!collidedWithElement) return;

    if (collidedWithElement instanceof Food) {
        console.log(collidedWithElement);
      this.eat(collidedWithElement);
    }

    // if part of me, die // TODO
  }

  eat(food) {
    food.remove()
    new Food()
    // this.grow();
  }
}
