import { Field } from "./Field.js";
import { Tetromino } from "../tetromino/Tetromino.js";

export class ExtraField extends Field {

  constructor(root: Element, rows: number, columns: number, cellSelector: string) {
    super(root, rows, columns, cellSelector);
  }

  protected setToCenter(tetromino: Tetromino) {
    tetromino.column = Math.round(this.columns/2 - tetromino.matrix.length/2);
    tetromino.row = Math.round(this.rows/2 - tetromino.matrix.length/2);
  }
}
