import { Field } from "./Field.js";
import { Tetromino } from "../tetromino/Tetromino";

export class MainField extends Field {

  constructor(root: Element, rows: number, columns: number, cellSelector: string) {
    super(root, rows, columns, cellSelector);
  }

  protected setToCenter(tetromino: Tetromino) {
    tetromino.column = Math.round((this.columns - tetromino.matrix.length)/2);
    tetromino.row = 0;
  }
}
