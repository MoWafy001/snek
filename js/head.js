import { Piece } from "./piece.js";
import { HEIGHT, PIECE_SIZE, WIDTH } from "./consts.js";
import { Food } from "./food.js";
import { piecesMap } from "./pieces-map.js";
import { BodyNode } from "./body-node.js";

export class Head extends Piece {
  xSpeed = 0;
  ySpeed = 0;
  child;

  previousX;
  previousY;
  dead = false;

  changingDirection = false;

  constructor(options) {
    super(options);
    this.element.id = "head";

    this.setMovementListeners();
  }

  setMovementListeners() {
    document.addEventListener("keydown", (event) => {
      if (this.changingDirection) return;

      switch (event.key) {
        case "ArrowUp":
          if (this.ySpeed !== 1) {
            this.xSpeed = 0;
            this.ySpeed = -1;
            this.changingDirection = true;
          }
          break;
        case "ArrowDown":
          if (this.ySpeed !== -1) {
            this.xSpeed = 0;
            this.ySpeed = 1;
            this.changingDirection = true;
          }
          break;
        case "ArrowLeft":
          if (this.xSpeed !== 1) {
            this.xSpeed = -1;
            this.ySpeed = 0;
            this.changingDirection = true;
          }
          break;
        case "ArrowRight":
          if (this.xSpeed !== -1) {
            this.xSpeed = 1;
            this.ySpeed = 0;
            this.changingDirection = true;
          }
          break;
      }
    });
  }

  updatePosition() {
    const nextX = this.x + this.xSpeed * PIECE_SIZE;
    const nextY = this.y + this.ySpeed * PIECE_SIZE;

    if (nextX >= 0 && nextX < WIDTH && nextY >= 0 && nextY < HEIGHT) {
      this.previousX = this.x;
      this.previousY = this.y;
      this.x = nextX;
      this.y = nextY;
      this.checkCollision();
      this.updateChildPosition();
      this.changingDirection = false;
    } else {
      this.die();
    }
  }

  updateChildPosition() {
    if (!this.child) return;

    this.child.updatePosition(this.previousX, this.previousY);
  }

  checkCollision() {
    const collidedWithElement = piecesMap.findCollision(this);
    if (!collidedWithElement) return;

    if (collidedWithElement instanceof Food) {
      this.eat(collidedWithElement);
    }

    if (collidedWithElement instanceof BodyNode) {
      this.die();
    }
  }

  eat(food) {
    food.remove();
    new Food();
    this.grow();
  }

  grow() {
    if (!this.child) {
      this.child = new BodyNode({
        parent: this,
        x: this.x,
        y: this.y,
      });
    } else {
      this.child.grow();
    }
  }

  die() {
    this.dead = true;
  }
}
