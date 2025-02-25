import {Field} from "./field/Field";
import {TetrominoList} from "./tetromino/TetrominoList.js";
import {Tetromino} from "./tetromino/Tetromino.js";
import {Score} from "./score/Score.js";
import {EventKey} from "./EventKey.js";

const KEY = EventKey;

export class Game {
  public intervalID: any;
  public isPause: boolean;
  private readonly _mainField: Field;
  private readonly _extraField: Field;
  private readonly _tetrominoList: TetrominoList;
  private readonly _score: Score;
  private mainTetromino: Tetromino;
  private nextTetromino: Tetromino;

  constructor(mainField: Field, extraField: Field, tetrominoList: TetrominoList, score: Score) {
    this.isPause = false;
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

  private drawMainField(): void {
    this._mainField.clearField();
    const isFullRow = this._mainField.drawField(this._score);
    this._mainField.drawTetromino(this.mainTetromino);

    if (isFullRow && this._score.isNewLevel()) {
      clearInterval(this.intervalID);
      this.autoMoveDown();
    }
  }

  public autoMoveDown() {
    this.intervalID = setInterval(() => {
      this.moveTetrominoDown();
      this.drawMainField();
    }, this._score.speed)
  }

  public makePause(pauseElement: HTMLElement) {
    console.log(this.isPause);
    if (this.isPause) {
      pauseElement.style.display = "none";
      this.autoMoveDown();
      this.isPause = false;
    } else {
      pauseElement.style.display = "block";
      clearInterval(this.intervalID);
      this.isPause = true;
    }
  }

  public controlsTetromino(e: string): void {
    switch (e) {
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

  public play(pauseElement: HTMLElement): void {
    this._extraField.addTetromino(this.nextTetromino);
    this._mainField.addTetromino(this.mainTetromino);
    this.autoMoveDown();

    document.addEventListener("keydown", (e: KeyboardEvent): void => {
      if (e.key === KEY.PAUSE) {
        this.makePause(pauseElement);
        return;
      }
      this.controlsTetromino(e.key);
    });
  }
}
