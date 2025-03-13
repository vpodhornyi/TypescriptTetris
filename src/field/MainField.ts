import {Field} from "./Field.js";
import {Tetromino} from "../tetromino/Tetromino";
import {Config} from "../Config.js";

export class MainField extends Field {

  constructor(root: Element, config: typeof Config) {
    super(root, config.MAIN_FIELD_ROWS, config.MAIN_FIELD_COLUMNS, config.CELLS_SELECTOR_MAIN);
  }

  protected setToCenter(tetromino: Tetromino) {
    tetromino.column = Math.round((this.columns - tetromino.matrix.length) / 2);
    tetromino.row = 0 - tetromino.matrix.length;
  }
}
