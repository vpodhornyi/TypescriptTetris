export class Score {
  private _scoreElement: Element;
  private _levelElement: Element;
  private _linesElement: Element;
  private _score: number;
  private _level: number;
  private _speed: number;


  constructor(score: Element, level: Element, lines: Element) {
    this._scoreElement = score;
    this._levelElement = level;
    this._linesElement = lines;
    this._score = 0;
    this._level = 0;
    this._speed = 700;
    this.setLines(0);
  }

  get score(): number {
    return this._score;
  }

  get speed(): number {
    return this._speed;
  }

  public setLines(num: number): void {
    this._linesElement.innerHTML = String(num)
  }

  public setScore(): void {
    this._score += 100;
    this._scoreElement.innerHTML = String(this._score);
  }

  public setLevel(): void {
    this._level += 1;
    this._speed -= 50;
    this._levelElement.innerHTML = String(this._level);
  }
}
