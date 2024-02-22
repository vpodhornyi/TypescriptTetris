import { TetrominoName } from "./TetrominoName.js";


export class Tetromino {
  private readonly _name: TetrominoName;
  private readonly _matrix: Array<Array<number>>;
  private _row: number = 0;
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
    this._column++;
  }

  public moveLeft(): void {
    this._column--;
  }

  public moveDown(): void {
    this._row++;
  }
}
