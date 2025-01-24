import {Field} from "./field/Field";
import {TetrominoList} from "./tetromino/TetrominoList.js";
import {Tetromino} from "./tetromino/Tetromino.js";
import {Score} from "./score/Score.js";
import {EventKey} from "./EventKey.js";

const KEY = EventKey;

export class Game {
  private intervalID: any;
  private pause: boolean;
  private readonly _mainField: Field;
  private readonly _extraField: Field;
  private readonly _tetrominoList: TetrominoList;
  private readonly _score: Score;
  private mainTetromino: Tetromino;
  private nextTetromino: Tetromino;

  constructor(mainField: Field, extraField: Field, tetrominoList: TetrominoList, score: Score) {
    this.pause = false;
    this._mainField = mainField;
    this._extraField = extraField;
    this._tetrominoList = tetrominoList;
    this._score = score;
    this.mainTetromino = this._tetrominoList.getRandomTetromino();
    this.nextTetromino = this._tetrominoList.getRandomTetromino().rotate(this._extraField);
  }

  private moveTetrominoDown(): void {
    if (this.mainTetromino.moveDown(this._mainField)) {
      this._mainField.placeTetromino(this.mainTetromino);
      this.mainTetromino = this.nextTetromino;
      this._mainField.addTetromino(this.mainTetromino);

      this.nextTetromino = this._tetrominoList.getRandomTetromino().rotate(this._extraField);
      this._extraField.clearField();
      this._extraField.addTetromino(this.nextTetromino);
    }
  }

  private resetAutoMove(): void {
    clearInterval(this.intervalID);
    this.autoMoveDown();
  }

  private drawMainField(): void {
    this._mainField.clearField();
    const isFullRow = this._mainField.drawField(this._score);
    this._mainField.drawTetromino(this.mainTetromino);

    if (isFullRow && this._score.isNewLevel()) this.resetAutoMove();
  }

  private autoMoveDown() {
    this.intervalID = setInterval(() => {
      this.moveTetrominoDown();
      this.drawMainField();

    }, this._score.speed)
  }

  public play(pause: Element): void {
    this._extraField.addTetromino(this.nextTetromino);
    this._mainField.addTetromino(this.mainTetromino);
    this.autoMoveDown();

    document.addEventListener("keydown", (e: KeyboardEvent): void => {
      if (e.key === KEY.BACKSPACE) {
        if (this.pause) {
          pause.className = "pause_not_active";
          this.autoMoveDown();
          this.pause = false;
        } else {
          pause.className = "pause";
          clearInterval(this.intervalID);
          this.pause = true;
        }
      }

      if (!this.pause) {
        switch (e.key) {
          case KEY.UP:
            this.mainTetromino.rotate(this._mainField);
            break;
          case KEY.LEFT:
            this.mainTetromino.moveLeft(this._mainField);
            break;
          case KEY.RIGHT:
            this.mainTetromino.moveRight(this._mainField);
            break;
          case KEY.DOWN:
            this.moveTetrominoDown();
        }
        this.drawMainField();
      }
    });
  }
}
