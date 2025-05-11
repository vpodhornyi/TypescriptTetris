import { Tetromino } from "./Tetromino.js";
import { TetrominoName } from "./TetrominoName.js";
import { TetrominoMatrix } from "./TetrominoMatrix.js";
export class TetrominoList {
    constructor() {
        this._tetrominos = new Array();
        this._tetrominos = Object.keys(TetrominoName).map((k) => {
            const t = TetrominoName[k];
            return new Tetromino(t, TetrominoMatrix[t]);
        });
        this._tetrominosLength = this._tetrominos.length;
    }
    getRandomTetromino() {
        return this._tetrominos[Math.floor(Math.random() * this._tetrominosLength)];
    }
}
