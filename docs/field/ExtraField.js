import { Field } from "./Field.js";
export class ExtraField extends Field {
    constructor(root, config) {
        super(root, config.extraFieldRows, config.extraFieldColumns, config.cellsExtra);
    }
    setToCenter(tetromino) {
        tetromino.column = Math.round((this.columns - tetromino.matrix.length) / 2);
        tetromino.row = Math.round((this.rows - tetromino.matrix.length) / 2);
    }
}
