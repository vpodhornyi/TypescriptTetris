import { TetrominoName } from "./TetrominoName.js";
import { Field } from "../field/Field";


export class Tetromino {
  private readonly _name: TetrominoName;
  private _matrix: Array<Array<number>>;
  private readonly _matrixLength: number;
  private _row: number = 0;
  private _column: number = 0;

  constructor(name: TetrominoName, matrix: Array<Array<number>>) {
    this._name = name;
    this._matrix = matrix;
    this._matrixLength = matrix.length;
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

  get matrixLength(): number {
    return this._matrixLength;
  }

  private rotateMatrix() {
    const rotateMatrix: Array<Array<number>> = [];
    for (let i: number = 0; i < this._matrixLength; i++) {
      rotateMatrix[i] = []
      for (let j: number = 0; j < this._matrixLength; j++) {
        rotateMatrix[i][j] = this._matrix[this._matrixLength - j - 1][i];
      }
    }
    return rotateMatrix;
  }

  public rotate() {
    // const oldMatrix = this._matrix;
    this._matrix = this.rotateMatrix()
  }

  public moveLeft(field: Field): void {
    this._column--;
    if (!this.isValid(field))
      this._column++;
  }

  public moveRight(field: Field): void {
    this._column++;
    if (!this.isValid(field))
      this._column--;
  }

  public moveDown(field: Field): boolean {
    // if (this._row + this._matrixLength < field.rows)
    this._row++;
    if (!this.isValid(field)) {
      this._row--;
      return true;
    }
    return false;
  }

  public isValid(field: Field) {
    for (let row = 0; row < this._matrixLength; row++) {
      for (let column = 0; column < this._matrixLength; column++) {
        if (this.isOutsideOfGameboard(row, column, field)) return false;
        if (this.hasCollisions(row, column, field)) return false;
      }
    }
    return true;
  }

  public isOutsideOfGameboard(row: number, column: number, field: Field) {
    return this._matrix[row][column] &&
        (
            this._column + column < 0
            || this._column + column >= field.columns
            || this._row + row >= field.rows
        );
  }

  public hasCollisions(row: number, column: number, field: Field) {
    return this._matrix[row][column]
        && field.playFieldArr[this._row + row][this._column + column];
  }
}
