import {UIManager} from "../UIManager.js";
import {TetrisConfig} from "../config/TetrisConfig.js";

export class Score {
  private _scoreElement: Element;
  private _levelElement: Element;
  private _linesElement: Element;
  private _score: number;
  private _level: number;
  private _speed: number;
  private readonly _scoreStep: number;
  private readonly _speedStep: number;
  private readonly _levelStep: number;
  private readonly _scoreLevelIncrease: number;


  constructor(ui: UIManager, config: TetrisConfig) {
    this._scoreElement = ui.score;
    this._levelElement = ui.level;
    this._linesElement = ui.lines;
    this._score = config.startScore;
    this._level = config.startLevel;
    ui.level.innerHTML = config.startLevel.toString();
    this._speed = config.startSpeed;
    this._scoreStep = config.scoreStep;
    this._speedStep = config.speedStep;
    this._levelStep = config.levelStep;
    this._scoreLevelIncrease = config.scoreLevelIncrease;
    this.setLines(config.startLines);
  }

  get score(): number {
    return this._score;
  }

  get speed(): number {
    return this._speed;
  }

  get levelStep(): number {
    return this._levelStep;
  }

  public isNewLevel(): boolean {
    return this._score % this._scoreLevelIncrease === 0;
  }

  public setLines(num: number): void {
    this._linesElement.innerHTML = String(num)
  }

  public setScore(): void {
    this._score += this._scoreStep;
    this._scoreElement.innerHTML = String(this._score);
  }

  public setLevel(): void {
    this._level += this._levelStep;
    this._speed -= this._speedStep;
    this._levelElement.innerHTML = String(this._level);
  }

  public reset(config: TetrisConfig): void {
    this._score = config.startScore;
    this._level = config.startLevel;
    this._speed = config.startSpeed;
    this.setLines(config.startLines);
    this._levelElement.innerHTML = String(this._level);
    this._scoreElement.innerHTML = String(this._score);
  }
}
