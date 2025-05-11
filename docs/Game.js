import { MainField } from "./field/MainField.js";
import { ExtraField } from "./field/ExtraField.js";
import { TetrominoList } from "./tetromino/TetrominoList.js";
import { Score } from "./score/Score.js";
export class Game {
    constructor(ui, config) {
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
    moveTetrominoDown() {
        if (this.mainTetromino.moveDown(this._mainField)) {
            this._mainField.placeTetromino(this.mainTetromino);
            if (this._mainField.isGameOver()) {
                clearInterval(this.intervalID);
                this._gameOverDialog.style.display = 'block';
            }
            else {
                this.mainTetromino = this.nextTetromino;
                this._mainField.addTetromino(this.mainTetromino);
                this.nextTetromino = this._tetrominoList.getRandomTetromino().rotate(this._extraField);
                this._extraField.clearField();
                this._extraField.addTetromino(this.nextTetromino);
            }
        }
    }
    drawMainField() {
        this._mainField.clearField();
        const isFullRow = this._mainField.drawField(this._score);
        this._mainField.drawTetromino(this.mainTetromino);
        if (isFullRow && this._score.isNewLevel()) {
            clearInterval(this.intervalID);
            this.autoMoveDown();
        }
    }
    autoMoveDown() {
        this.intervalID = setInterval(() => {
            this.moveTetrominoDown();
            this.drawMainField();
        }, this._score.speed);
    }
    makePause() {
        if (this.isPause) {
            this._ui.pause.style.display = "none";
            this.autoMoveDown();
        }
        else {
            this._ui.pause.style.display = "block";
            clearInterval(this.intervalID);
        }
        this.isPause = !this.isPause;
    }
    roatateTetromino() {
        this.mainTetromino.rotate(this._mainField);
        this.drawMainField();
    }
    moveTetrominoLeft() {
        this.mainTetromino.moveLeft(this._mainField);
        this.drawMainField();
    }
    moveTetrominoReght() {
        this.mainTetromino.moveRight(this._mainField);
        this.drawMainField();
    }
    moveTetrominoDownRedrawField() {
        this.moveTetrominoDown();
        this.drawMainField();
    }
    controlsTetromino(e, config) {
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
    init(config) {
        document.addEventListener("keydown", (e) => {
            e.key === config.PAUSE ? this.makePause() : this.controlsTetromino(e.key, config);
        });
    }
    play() {
        this._extraField.addTetromino(this.nextTetromino);
        this._mainField.addTetromino(this.mainTetromino);
        this.autoMoveDown();
    }
    reset(config) {
        this._mainField.clearField();
        this._mainField.resetField();
        this._extraField.clearField();
        this._extraField.resetField();
        this._score.reset(config);
        this.mainTetromino = this._tetrominoList.getRandomTetromino();
        this.nextTetromino = this._tetrominoList.getRandomTetromino().rotate(this._extraField);
    }
}
