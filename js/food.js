import { Piece } from "./piece.js";
import { piecesMap } from "./pieces-map.js";

export class Food extends Piece{
    constructor(options) {
        super(options);
        this.element.classList.add("food");
    }

    remove(){
        piecesMap.remove(this)
        this.element.remove()
    }
}