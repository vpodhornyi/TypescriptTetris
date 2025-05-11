import {Field} from "./Field.js";
import {Tetromino} from "../tetromino/Tetromino.js";
import {TetrisConfig} from "../config/TetrisConfig.js";

export class ExtraField extends Field {

  constructor(root: Element, config: TetrisConfig) {
    super(root, config.extraFieldRows, config.extraFieldColumns, config.cellsExtra);
  }

  protected setToCenter(tetromino: Tetromino) {
    tetromino.column = Math.round((this.columns - tetromino.matrix.length) / 2);
    tetromino.row = Math.round((this.rows - tetromino.matrix.length) / 2);
  }
}
