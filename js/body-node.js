import { Piece } from "./piece.js";

export class BodyNode extends Piece {
  parent;
  child;

  previousX;
  previousY;

  constructor(options) {
    super(options);
    this.parent = options.parent;
    this.element.classList.add("body-node");
  }

  updatePosition(newX, newY) {
    this.previousX = this.x;
    this.previousY = this.y;
    this.x = newX;
    this.y = newY;
    this.updateChildPosition();
  }

  updateChildPosition() {
    if (!this.child) return;

    this.child.updatePosition(this.previousX, this.previousY);
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
}
