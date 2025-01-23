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


  constructor(score: Element, level: Element, lines: Element,
              startScore: number, startLevel: number, startSpeed: number,
              scoreStep: number, speedStep: number, levelStep: number,
              scoreLevelIncrease: number) {
    this._scoreElement = score;
    this._levelElement = level;
    this._linesElement = lines;
    this._score = startScore;
    this._level = startLevel;
    this._speed = startSpeed;
    this._scoreStep = scoreStep;
    this._speedStep = speedStep;
    this._levelStep = levelStep;
    this._scoreLevelIncrease = scoreLevelIncrease;
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
}
