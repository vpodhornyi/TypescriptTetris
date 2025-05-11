import {Field} from "./Field.js";
import {Tetromino} from "../tetromino/Tetromino";
import {TetrisConfig} from "../config/TetrisConfig.js";

export class MainField extends Field {

  constructor(root: Element, config: TetrisConfig) {
    super(root, config.mainFieldRows, config.mainFieldColumns, config.cellsMain);
  }

  protected setToCenter(tetromino: Tetromino) {
    tetromino.column = Math.round((this.columns - tetromino.matrix.length) / 2);
    tetromino.row = 0 - tetromino.matrix.length;
  }
}
