export class Score {
    constructor(ui, config) {
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
    get score() {
        return this._score;
    }
    get speed() {
        return this._speed;
    }
    get levelStep() {
        return this._levelStep;
    }
    isNewLevel() {
        return this._score % this._scoreLevelIncrease === 0;
    }
    setLines(num) {
        this._linesElement.innerHTML = String(num);
    }
    setScore() {
        this._score += this._scoreStep;
        this._scoreElement.innerHTML = String(this._score);
    }
    setLevel() {
        this._level += this._levelStep;
        this._speed -= this._speedStep;
        this._levelElement.innerHTML = String(this._level);
    }
    reset(config) {
        this._score = config.startScore;
        this._level = config.startLevel;
        this._speed = config.startSpeed;
        this.setLines(config.startLines);
        this._levelElement.innerHTML = String(this._level);
        this._scoreElement.innerHTML = String(this._score);
    }
}
