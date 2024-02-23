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

  constructor(mainField: Field, extraField: Field, tetrominoList: TetrominoList) {
    this._mainField = mainField;
    this._extraField = extraField;
    this._tetrominoList = tetrominoList;
  }

  public play(): void {
    const tetromino: Tetromino = this._tetrominoList.getRandomTetromino();

    this._extraField.addTetromino(tetromino);
    this._mainField.addTetromino(tetromino);
    document.addEventListener(EVENT_KEY_DOWN, this.onKeyDown(tetromino));
  }

  private onKeyDown(tetromino: Tetromino) {
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
      this._mainField.clearField();
      this._mainField.drawTetromino(tetromino);
    }
  }
}
