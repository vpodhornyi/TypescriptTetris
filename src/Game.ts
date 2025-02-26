import {Field} from "./field/Field";
import {TetrominoList} from "./tetromino/TetrominoList.js";
import {Tetromino} from "./tetromino/Tetromino.js";
import {Score} from "./score/Score.js";
import {EventKey as KEY} from "./EventKey.js";

export class Game {
  public intervalID: any;
  public isPause: boolean;
  private readonly _mainField: Field;
  private readonly _extraField: Field;
  private readonly _tetrominoList: TetrominoList;
  private readonly _gameOvertDialog: HTMLElement;
  private readonly _score: Score;
  private mainTetromino: Tetromino;
  private nextTetromino: Tetromino;

  constructor(mainField: Field, extraField: Field, tetrominoList: TetrominoList, score: Score, gameOvertDialog: HTMLElement) {
    this.isPause = false;
    this._mainField = mainField;
    this._extraField = extraField;
    this._tetrominoList = tetrominoList;
    this._gameOvertDialog = gameOvertDialog;
    this._score = score;
    this.mainTetromino = this._tetrominoList.getRandomTetromino();
    this.nextTetromino = this._tetrominoList.getRandomTetromino().rotate(this._extraField);
  }

  private moveTetrominoDown(): void {
    if (this.mainTetromino.moveDown(this._mainField)) {
      this._mainField.placeTetromino(this.mainTetromino);

      if (this._mainField.isGameOver()) {
        clearInterval(this.intervalID);
        this._gameOvertDialog.style.display = 'block';
      } else {
        this.mainTetromino = this.nextTetromino;
        this._mainField.addTetromino(this.mainTetromino);

        this.nextTetromino = this._tetrominoList.getRandomTetromino().rotate(this._extraField);
        this._extraField.clearField();
        this._extraField.addTetromino(this.nextTetromino);
      }
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

  private autoMoveDown(): void {
    this.intervalID = setInterval(() => {
      this.moveTetrominoDown();
      this.drawMainField();
    }, this._score.speed)
  }

  public makePause(pauseElement: HTMLElement): void {
    if (this.isPause) {
      pauseElement.style.display = "none";
      this.autoMoveDown();
    } else {
      pauseElement.style.display = "block";
      clearInterval(this.intervalID);
    }
    this.isPause = !this.isPause;
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

  public init(pauseElement: HTMLElement): void {
    document.addEventListener("keydown", (e: KeyboardEvent): void => {
      e.key === KEY.PAUSE ? this.makePause(pauseElement) : this.controlsTetromino(e.key);
    });
  }

  public play(): void {
    this._extraField.addTetromino(this.nextTetromino);
    this._mainField.addTetromino(this.mainTetromino);
    this.autoMoveDown();
  }

  public reset(): void {
    this._mainField.clearField();
    this._mainField.resetField()
    this._extraField.clearField();
    this._extraField.resetField();
    this._score.reset();
    this.mainTetromino = this._tetrominoList.getRandomTetromino();
    this.nextTetromino = this._tetrominoList.getRandomTetromino().rotate(this._extraField);
  }
}
