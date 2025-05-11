import { Field } from "./Field.js";
export class MainField extends Field {
    constructor(root, config) {
        super(root, config.mainFieldRows, config.mainFieldColumns, config.cellsMain);
    }
    setToCenter(tetromino) {
        tetromino.column = Math.round((this.columns - tetromino.matrix.length) / 2);
        tetromino.row = 0 - tetromino.matrix.length;
    }
}
