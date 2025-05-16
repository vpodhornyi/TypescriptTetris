import {TetrisConfig} from "./config/TetrisConfig.js";
import {Game} from "./Game.js";

const NOT_FOUND_ELEMENT = 'Element was not found:'
const DIV: string = 'div';
const CSS = {
  block: 'block',
  none: 'none',
}

export class UIManager {
  private _container: HTMLElement;
  private _startDialog: HTMLElement;
  private _gameOverDialog: HTMLElement;
  private _mainField: HTMLElement;
  private _extraField: HTMLElement;
  private _score: HTMLElement;
  private _level: HTMLElement;
  private _lines: HTMLElement;
  private _pause: HTMLElement;


  constructor(config: TetrisConfig) {
    this._container = this.getElement(config.container);
    this._startDialog = this.getElement(config.startDialog);
    this._gameOverDialog = this.getElement(config.gameOverDialog);
    this._mainField = this.getElement(config.mainField);
    this._extraField = this.getElement(config.extraField);
    this._score = this.getElement(config.score);
    this._level = this.getElement(config.level);
    this._lines = this.getElement(config.lines);
    this._pause = this.getElement(config.pause);
    this.generateField(this._mainField, config.mainFieldRows, config.mainFieldColumns);
    this.generateField(this._extraField, config.extraFieldRows, config.extraFieldColumns);
    this.setLevelUI(config.startLevel);
    this.setLinesUI(config.startLines);
  }

  private getElement<T extends HTMLElement>(selector: string): T {
    const el = document.querySelector(selector);
    if (!el) {
      throw new Error(`${NOT_FOUND_ELEMENT} ${selector}`);
    }
    return el as T;
  }

  private isClickBtn(e: HTMLElement, className: string): boolean {
    return e?.classList.contains(className);
  }

  private generateField(el: Element, rows: number, columns: number): void {
    const amount = rows * columns;
    for (let i: number = 0; i < amount; i++) {
      el.append(document.createElement(DIV));
    }
  }

  public setScoreUI(value: number): void {
    this._score.innerHTML = String(value);
  }

  public setLevelUI(value: number): void {
    this._level.innerHTML = String(value);
  }

  public setLinesUI(value: number): void {
    this._lines.innerHTML = String(value);
  }

  public showStartDialog() {
    this._startDialog.style.display = CSS.block;
  }

  private hideStartDialog() {
    this._startDialog.style.display = CSS.none;
  }

  public showPause() {
    this._pause.style.display = CSS.block;
  }

  public hidePause() {
    this._pause.style.display = CSS.none;
  }

  public showGameOverDialog() {
    this._gameOverDialog.style.display = CSS.block;
  }

  private hideGameOverDialog() {
    this._gameOverDialog.style.display = CSS.none;
  }

  public startGame(game: Game, config: TetrisConfig): void {
    this._container.addEventListener('click', (event: Event) => {
      const eventElement = event.target as HTMLElement;

      if (this.isClickBtn(eventElement, 'start-button')) {
        this.hideStartDialog();
        game.play();
      }

      if (this.isClickBtn(eventElement, 'game-over-button')) {
        this.hideGameOverDialog()
        this.showStartDialog();
        game.reset(config);
      }

      if (this.isClickBtn(eventElement, 'btn_rotate')) game.roatateTetromino();
      if (this.isClickBtn(eventElement, 'btn_left')) game.moveTetrominoLeft();
      if (this.isClickBtn(eventElement, 'btn_right')) game.moveTetrominoReght();
      if (this.isClickBtn(eventElement, 'btn_down')) game.moveTetrominoDownRedrawField();
      if (this.isClickBtn(eventElement, 'btn_pause')) game.makePause();
    })
  }
}