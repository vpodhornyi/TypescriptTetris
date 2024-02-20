import { Tetromino } from "./tetromino/Tetromino.js";
const DIV: string = 'div';
const CELLS_SELECTOR: string = '#root div';
const UP: string = 'ArrowUp';
const LEFT: string = 'ArrowLeft';
const RIGHT: string = 'ArrowRight';
const DOWN: string = 'ArrowDown';

export class Field {
  private readonly _rows: number = 20;
  private readonly _columns: number = 10;
  private readonly _amount: number = this._rows * this._columns;
  private readonly _playFieldArr: Array<Array<number>> = new Array(this._rows)
      .fill(0)
      .map(() => new Array(this._columns).fill(0));
  private cells: Array<Element>;


  constructor(root: Element) {
    this.generateField(root);
    this.cells = Array.from(document.querySelectorAll(CELLS_SELECTOR));
  }

  private generateField(root: Element): void {
    for (let i: number = 0; i < this._amount; i++) {
      root.append(document.createElement(DIV));
    }
  }

  private convertPositionToIndex(row: number, column: number) {
    return row * this._columns + column;
  }

  public drawTetromino(tetromino: Tetromino) {
    for (let r = 0; r < tetromino.matrix.length; r++) {
      for (let c = 0; c < tetromino.matrix[0].length; c++) {
        if (!tetromino.matrix[r][c]) continue;

        const cellIndex = this.convertPositionToIndex(tetromino.row + r, tetromino.column + c);
        this.cells[cellIndex].classList.add(tetromino.name);
      }
    }
  }

  private clearField(): void {
    this.cells.forEach(cell => cell.removeAttribute('class'));
  }

  public onKeyDown(tetromino: Tetromino) {
    return (e: KeyboardEvent) => {
      switch (e.key) {
        case LEFT:
          tetromino.moveLeft();
          break;
        case RIGHT:
          tetromino.moveRight();
          break;
        case DOWN:
          tetromino.moveDown();
          break;
      }
      this.clearField();
      this.drawTetromino(tetromino);
    }
  }
}
