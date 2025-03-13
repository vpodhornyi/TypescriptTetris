import {Config} from "../Config.js";

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


  constructor(score: Element, level: Element, lines: Element, config: typeof Config) {
    this._scoreElement = score;
    this._levelElement = level;
    this._linesElement = lines;
    this._score = config.START_SCORE;
    this._level = config.START_LEVEL;
    level.innerHTML = config.START_LEVEL.toString();
    this._speed = config.START_SPEED;
    this._scoreStep = config.SCORE_STEP;
    this._speedStep = config.SPEED_STEP;
    this._levelStep = config.LEVEL_STEP;
    this._scoreLevelIncrease = config.SCORE_LEVEL_INCREASE;
    this.setLines(0);
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

  public reset(): void {
    this._score = 0;
    this._level = 1;
    this._speed = 1000;
    this.setLines(0);
    this._levelElement.innerHTML = String(this._level);
    ;
    this._scoreElement.innerHTML = String(this._score);
  }
}
