import {UIManager} from "../UIManager.js";
import {TetrisConfig} from "../config/TetrisConfig.js";

export class Score {
  private _ui: UIManager;
  private _score: number;
  private _level: number;
  private _speed: number;
  private readonly _scoreStep: number;
  private readonly _speedStep: number;
  private readonly _levelStep: number;
  private readonly _scoreLevelIncrease: number;


  constructor(ui: UIManager, config: TetrisConfig) {
    this._ui = ui;
    this._score = config.startScore;
    this._level = config.startLevel;
    this._speed = config.startSpeed;
    this._scoreStep = config.scoreStep;
    this._speedStep = config.speedStep;
    this._levelStep = config.levelStep;
    this._scoreLevelIncrease = config.scoreLevelIncrease;
    this._ui.setLevelUI(config.startLevel);
    this._ui.setLinesUI(config.startLines);
  }

  get score(): number {
    return this._score;
  }

  get speed(): number {
    return this._speed;
  }

  public isNewLevel(): boolean {
    return this._score % this._scoreLevelIncrease === 0;
  }

  public setLines(count: number): void {
    this._ui.setLinesUI(count);
  }

  public setScore(): void {
    this._score += this._scoreStep;
    this._ui.setScoreUI(this._score);
  }

  public setLevel(): void {
    this._level += this._levelStep;
    this._speed -= this._speedStep;
    this._ui.setLevelUI(this._level);
  }

  public reset(config: TetrisConfig): void {
    this._score = config.startScore;
    this._ui.setScoreUI(config.startScore);
    this._level = config.startLevel;
    this._ui.setLevelUI(config.startLevel);
    this._ui.setLinesUI(config.startLines);
    this._speed = config.startSpeed;
  }
}
