import { Tetromino } from "./Tetromino.js";
import { TetrominoName } from "./TetrominoName.js";
import { TetrominoMatrix } from "./TetrominoMatrix.js";

export class TetrominoList {
  private readonly _tetrominos: Array<Tetromino> = new Array<Tetromino>();

  constructor() {
    this._tetrominos = Object.keys(TetrominoName).map((k: string) => {
      const t: TetrominoName = TetrominoName[k as keyof typeof TetrominoName];
      return new Tetromino(t, TetrominoMatrix[t]);
    });
  }

  public getRandomTetromino(): Tetromino {
    return this._tetrominos[Math.floor(Math.random() * this._tetrominos.length)];
  }
}
