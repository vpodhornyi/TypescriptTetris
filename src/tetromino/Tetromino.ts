import { TetrominoName } from "./TetrominoName.js";
import { TetrominoMatrix } from "./TetrominoMatrix.js";


export class Tetromino {
  private readonly _name: TetrominoName;
  private readonly _matrix: Array<Array<number>>;
  private _row: number = 1;
  private _column: number = 4;


  constructor(name: TetrominoName, matrix: Array<Array<number>>) {
    this._name = name;
    this._matrix = matrix;
  }

  set row(value: number) {
    this._row = value;
  }

  set column(value: number) {
    this._column = value;
  }

  get name(): TetrominoName {
    return this._name;
  }

  get matrix(): Array<Array<number>> {
    return this._matrix;
  }

  get row(): number {
    return this._row;
  }

  get column(): number {
    return this._column;
  }

  public moveRight(): void {
    this._column += 1;
  }

  public moveLeft(): void {
    this._column -= 1;
  }

  public moveDown(): void {
    this._row += 1;
  }
}


// export class TetrominoI extends Tetromino {
//   constructor() {
//     super(TetrominoName.I, TetrominoMatrix[TetrominoName.I]);
//   }
// }

export const tetrominos: Tetromino[] = [
  new Tetromino(TetrominoName.I, TetrominoMatrix[TetrominoName.I]),
  new Tetromino(TetrominoName.O, TetrominoMatrix[TetrominoName.O]),
  new Tetromino(TetrominoName.T, TetrominoMatrix[TetrominoName.T]),
  new Tetromino(TetrominoName.J, TetrominoMatrix[TetrominoName.J]),
  new Tetromino(TetrominoName.L, TetrominoMatrix[TetrominoName.L]),
  new Tetromino(TetrominoName.S, TetrominoMatrix[TetrominoName.S]),
  new Tetromino(TetrominoName.Z, TetrominoMatrix[TetrominoName.Z]),
]
