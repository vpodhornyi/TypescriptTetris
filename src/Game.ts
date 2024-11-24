import { Field } from "./field/Field";
import { TetrominoList } from "./tetromino/TetrominoList.js";
import { Tetromino } from "./tetromino/Tetromino.js";
import { EventKey } from "./EventKey.js";

const START_SPEED: number = 500;
const {
  UP,
  LEFT,
  RIGHT,
  DOWN
} = EventKey;

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
    this.nextTetromino = this._tetrominoList.getRandomTetromino().rotate(this._mainField);
  }

  private moveTetrominoDown(): void {
    if (this.mainTetromino.moveDown(this._mainField)) {
      this._mainField.placeTetromino(this.mainTetromino);
      this.mainTetromino = this.nextTetromino;
      this._mainField.addTetromino(this.mainTetromino);

      this.nextTetromino = this._tetrominoList.getRandomTetromino().rotate(this._mainField);
      this._extraField.clearField();
      this._extraField.addTetromino(this.nextTetromino);
    }
  }

  private drawMainField(): void {
    this._mainField.clearField();
    this._mainField.drawField();
    this._mainField.drawTetromino(this.mainTetromino);
  }

  private autoMoveDown(speed: number) {
    setInterval(() => {
      this.moveTetrominoDown();
      this.drawMainField();
    }, speed)
  }

  public play(): void {
    this._extraField.addTetromino(this.nextTetromino);
    this._mainField.addTetromino(this.mainTetromino);
    this.autoMoveDown(START_SPEED);

    document.addEventListener("keydown", (e: KeyboardEvent): void => {
      switch (e.key) {
        case UP:
          this.mainTetromino.rotate(this._mainField);
          break;
        case LEFT:
          this.mainTetromino.moveLeft(this._mainField);
          break;
        case RIGHT:
          this.mainTetromino.moveRight(this._mainField);
          break;
        case DOWN:
          this.moveTetrominoDown();
      }
      this.drawMainField();
    });
  }
}
