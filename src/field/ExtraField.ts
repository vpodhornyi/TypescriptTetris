import {Field} from "./Field.js";
import {Tetromino} from "../tetromino/Tetromino.js";
import {Config} from "../Config.js";

export class ExtraField extends Field {

  constructor(root: Element, config: typeof Config) {
    super(root, config.EXTRA_FIELD_ROWS, config.EXTRA_FIELD_COLUMNS, config.CELLS_SELECTOR_EXTRA);
  }

  protected setToCenter(tetromino: Tetromino) {
    tetromino.column = Math.round((this.columns - tetromino.matrix.length) / 2);
    tetromino.row = Math.round((this.rows - tetromino.matrix.length) / 2);
  }
}
