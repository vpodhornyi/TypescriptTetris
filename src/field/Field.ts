import {Tetromino} from "../tetromino/Tetromino.js";
import {Score} from "../score/Score.js";

const DIV: string = 'div';
const CLASS_TETROMINO: string = 'block';
const CLASS: string = 'class';

export abstract class Field {
  private readonly _rows: number;
  private readonly _columns: number;
  private readonly _amount: number;
  private readonly _playFieldArr: Array<Array<any>>;
  private readonly cells: Array<Element>;
  private _rowCount: number;

  protected constructor(root: Element, rows: number, columns: number, cellSelector: string) {
    this._rows = rows;
    this._columns = columns;
    this._playFieldArr = new Array(this._rows)
      .fill(0)
      .map(() => new Array(this._columns).fill(0));
    this._amount = this._rows * this._columns;
    this.generateField(root);
    this.cells = Array.from(document.querySelectorAll(cellSelector));
    this._rowCount = 0;
  }

  get rows(): number {
    return this._rows;
  }

  get columns(): number {
    return this._columns;
  }

  get playFieldArr(): Array<Array<any>> {
    return this._playFieldArr;
  }

  protected abstract setToCenter(tetromino: Tetromino): void;

  public clearField(): void {
    this.cells.forEach(cell => cell.removeAttribute(CLASS));
  }

  protected convertPositionToIndex(row: number, column: number) {
    return row * this._columns + column;
  }

  public drawTetromino(tetromino: Tetromino): void {
    const ln = tetromino.matrix.length;
    for (let r = 0; r < ln; r++) {
      for (let c = 0; c < ln; c++) {
        if (!tetromino.matrix[r][c]) continue;

        const cellIndex = this.convertPositionToIndex(tetromino.row + r, tetromino.column + c);
        this.cells[cellIndex] && this.cells[cellIndex].classList.add(tetromino.name, CLASS_TETROMINO);
      }
    }
  }

  private deleteFullRows(isFullRow: boolean, score: Score, row: number): boolean {
    if (isFullRow) {
      this._playFieldArr.splice(row, 1);
      this._playFieldArr.unshift(new Array(this._columns).fill(0));
      this.clearField();
      for (let row: number = 0; row < this._rows; row++) {
        for (let column: number = 0; column < this._columns; column++) {

          if (this._playFieldArr[row][column] == 0) continue;

          const name = this._playFieldArr[row][column];
          const cellIndex: number = this.convertPositionToIndex(row, column);
          this.cells[cellIndex].classList.add(name, CLASS_TETROMINO);
        }
      }
      this._rowCount += 1;
      score.setLines(this._rowCount);
      score.setScore();

      if (score.isNewLevel()) {
        score.setLevel();
      }
      return  true
    }
    return false;
  }

  public drawField(score: Score): boolean {
    let res = false
    for (let row: number = 0; row < this._rows; row++) {
      let columnsCaunt: number = this._columns;
      for (let column: number = 0; column < this._columns; column++) {

        if (this._playFieldArr[row][column] == 0) continue;

        columnsCaunt -= 1;

        const name = this._playFieldArr[row][column];
        const cellIndex: number = this.convertPositionToIndex(row, column);

        this.cells[cellIndex].classList.add(name, CLASS_TETROMINO);
        res = this.deleteFullRows(columnsCaunt === 0, score, row);
      }
    }
    return res;
  }

  public addTetromino(tetromino: Tetromino) {
    this.setToCenter(tetromino);
    this.drawTetromino(tetromino);
  }

  public placeTetromino(tetromino: Tetromino) {
    for (let row: number = 0; row < tetromino.matrixLength; row++) {
      for (let column: number = 0; column < tetromino.matrixLength; column++) {
        if (tetromino.matrix[row][column]) {
          this._playFieldArr[tetromino.row + row][tetromino.column + column] = tetromino.name;
        }
      }
    }
  }

  private generateField(el: Element): void {
    for (let i: number = 0; i < this._amount; i++) {
      el.append(document.createElement(DIV));
    }
  }
}
