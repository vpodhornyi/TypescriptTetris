import { Field } from "./field/Field";
import { TetrominoList } from "./tetromino/TetrominoList.js";
import { Tetromino } from "./tetromino/Tetromino.js";

const EVENT_KEY_DOWN = 'keydown';
const UP: string = 'ArrowUp';
const LEFT: string = 'ArrowLeft';
const RIGHT: string = 'ArrowRight';
const DOWN: string = 'ArrowDown';

export class Game {
  private readonly _mainField: Field;
  private readonly _extraField: Field;
  private readonly _tetrominoList: TetrominoList;
  private mainTetromino: Tetromino;
  private nextTetromino: Tetromino;

  constructor(mainField: Field, extraField: Field, tetrominoList: TetrominoList) {
    this._mainField = mainField;
    this._extraField = extraField;
    this._tetrominoList = tetrominoList;
    this.mainTetromino = this._tetrominoList.getRandomTetromino();
    this.nextTetromino = this._tetrominoList.getRandomTetromino();
  }

  public play(): void {
    this._extraField.addTetromino(this.nextTetromino);
    this._mainField.addTetromino(this.mainTetromino);
    document.addEventListener(EVENT_KEY_DOWN, (e: KeyboardEvent): void => {
      switch (e.key) {
        case UP:
          this.mainTetromino.rotate();
          break;
        case LEFT:
          this.mainTetromino.moveLeft(this._mainField);
          break;
        case RIGHT:
          this.mainTetromino.moveRight(this._mainField);
          break;
        case DOWN:
          if (this.mainTetromino.moveDown(this._mainField)) {
            this._mainField.placeTetromino(this.mainTetromino);
            this.mainTetromino = this.nextTetromino;
            this._mainField.addTetromino(this.mainTetromino);

            this.nextTetromino = this._tetrominoList.getRandomTetromino();
            this._extraField.clearField();
            this._extraField.addTetromino(this.nextTetromino);
          }
      }
      this._mainField.clearField();
      this._mainField.drawField();
      this._mainField.drawTetromino(this.mainTetromino);
    });
  }
}
