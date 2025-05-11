import {Field} from "./field/Field.js";
import {MainField} from "./field/MainField.js";
import {ExtraField} from "./field/ExtraField.js";
import {TetrominoList} from "./tetromino/TetrominoList.js";
import {Tetromino} from "./tetromino/Tetromino.js";
import {Score} from "./score/Score.js";
import {TetrisConfig} from "./config/TetrisConfig.js";
import {UIManager} from "./UIManager.js";

export class Game {
  public intervalID: any;
  public isPause: boolean;
  private readonly _mainField: Field;
  private readonly _extraField: Field;
  private readonly _tetrominoList: TetrominoList;
  private readonly _ui: UIManager;
  private readonly _gameOverDialog: HTMLElement;
  private readonly _score: Score;
  private mainTetromino: Tetromino;
  private nextTetromino: Tetromino;

  constructor(ui: UIManager, config: TetrisConfig) {
    this.isPause = false;
    this._mainField = new MainField(ui.mainField, config);
    this._extraField = new ExtraField(ui.extraField, config);
    this._tetrominoList = new TetrominoList();
    this._ui = ui;
    this._gameOverDialog = ui.gameOverDialog;
    this._score = new Score(ui, config);
    this.mainTetromino = this._tetrominoList.getRandomTetromino();
    this.nextTetromino = this._tetrominoList.getRandomTetromino().rotate(this._extraField);
  }

  public moveTetrominoDown(): void {
    if (this.mainTetromino.moveDown(this._mainField)) {
      this._mainField.placeTetromino(this.mainTetromino);

      if (this._mainField.isGameOver()) {
        clearInterval(this.intervalID);
        this._gameOverDialog.style.display = 'block';
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

  public makePause(): void {
    if (this.isPause) {
      this._ui.pause.style.display = "none";
      this.autoMoveDown();
    } else {
      this._ui.pause.style.display = "block";
      clearInterval(this.intervalID);
    }
    this.isPause = !this.isPause;
  }

  public roatateTetromino(): void {
    this.mainTetromino.rotate(this._mainField);
    this.drawMainField();
  }

  public moveTetrominoLeft(): void {
    this.mainTetromino.moveLeft(this._mainField);
    this.drawMainField();
  }

  public moveTetrominoReght(): void {
    this.mainTetromino.moveRight(this._mainField);
    this.drawMainField();
  }

  public controlsTetromino(e: string, config: TetrisConfig): void {
    switch (e) {
      case config.UP:
        this.mainTetromino.rotate(this._mainField);
        break;
      case config.LEFT:
        this.mainTetromino.moveLeft(this._mainField);
        break;
      case config.RIGHT:
        this.mainTetromino.moveRight(this._mainField);
        break;
      case config.DOWN:
        this.moveTetrominoDown();
    }
    this.drawMainField();
  }

  public init(config: TetrisConfig): void {
    document.addEventListener("keydown", (e: KeyboardEvent): void => {
      e.key === config.PAUSE ? this.makePause() : this.controlsTetromino(e.key, config);
    });
  }

  public play(): void {
    this._extraField.addTetromino(this.nextTetromino);
    this._mainField.addTetromino(this.mainTetromino);
    this.autoMoveDown();
  }

  public reset(config: TetrisConfig): void {
    this._mainField.clearField();
    this._mainField.resetField()
    this._extraField.clearField();
    this._extraField.resetField();
    this._score.reset(config);
    this.mainTetromino = this._tetrominoList.getRandomTetromino();
    this.nextTetromino = this._tetrominoList.getRandomTetromino().rotate(this._extraField);
  }
}
