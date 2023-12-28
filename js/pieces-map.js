class PiecesMap {
  constructor() {
    this.pieces = [];
  }

  add(piece) {
    this.pieces.push(piece);
  }

  remove(piece) {
    const index = this.pieces.indexOf(piece);
    if (index > -1) {
      this.pieces.splice(index, 1);
    }
  }

  forEach(callback) {
    this.pieces.forEach(callback);
  }

  findCollision(forElement) {
    return this.pieces.find((e) => {
      if (forElement === e) return false;
      if (forElement.x !== e.x) return false;
      if (forElement.y !== e.y) return false;

      return true;
    });
  }

  clear() {
    this.pieces = [];
  }
}

export const piecesMap = new PiecesMap();
