import {TetrisConfig} from "./config/TetrisConfig.js";
import {Game} from "./Game.js";

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
  }

  private getElement<T extends HTMLElement>(selector: string): T {
    const el = document.querySelector(selector);
    if (!el) {
      throw new Error(`Element was not found: ${selector}`);
    }
    return el as T;
  }

  private isClickBtn(e: HTMLElement, className: string): boolean {
    return e?.classList.contains(className);
  }

  public get container(): HTMLElement {
    return this._container;
  }

  public get startDialog(): HTMLElement {
    return this._startDialog;
  }

  public get gameOverDialog(): HTMLElement {
    return this._gameOverDialog;
  }

  public get mainField(): HTMLElement {
    return this._mainField;
  }

  public get extraField(): HTMLElement {
    return this._extraField;
  }

  public get score(): HTMLElement {
    return this._score;
  }

  public get level(): HTMLElement {
    return this._level;
  }

  public get lines(): HTMLElement {
    return this._lines;
  }

  public get pause(): HTMLElement {
    return this._pause;
  }

  public startGame(game: Game, config: TetrisConfig): void {
    this.container.addEventListener('click', (event: Event) => {
      const eventElement = event.target as HTMLElement;

      if (this.isClickBtn(eventElement, 'start-button')) {
        this.startDialog.style.display = "none";
        game.play();
      }

      if (this.isClickBtn(eventElement, 'game-over-button')) {
        this.gameOverDialog.style.display = "none";
        this.startDialog.style.display = "block";
        game.reset(config);
      }

      if (this.isClickBtn(eventElement, 'btn_rotate')) game.roatateTetromino();
      if (this.isClickBtn(eventElement, 'btn_left')) game.moveTetrominoLeft();
      if (this.isClickBtn(eventElement, 'btn_right')) game.moveTetrominoReght();
      if (this.isClickBtn(eventElement, 'btn_down')) game.moveTetrominoDown();
      if (this.isClickBtn(eventElement, 'btn_pause')) game.makePause();
    })
  }
}