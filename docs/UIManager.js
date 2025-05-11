export class UIManager {
    constructor(config) {
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
    getElement(selector) {
        const el = document.querySelector(selector);
        if (!el) {
            throw new Error(`Element was not found: ${selector}`);
        }
        return el;
    }
    isClickBtn(e, className) {
        return e === null || e === void 0 ? void 0 : e.classList.contains(className);
    }
    get container() {
        return this._container;
    }
    get startDialog() {
        return this._startDialog;
    }
    get gameOverDialog() {
        return this._gameOverDialog;
    }
    get mainField() {
        return this._mainField;
    }
    get extraField() {
        return this._extraField;
    }
    get score() {
        return this._score;
    }
    get level() {
        return this._level;
    }
    get lines() {
        return this._lines;
    }
    get pause() {
        return this._pause;
    }
    startGame(game, config) {
        this.container.addEventListener('click', (event) => {
            const eventElement = event.target;
            if (this.isClickBtn(eventElement, 'start-button')) {
                this.startDialog.style.display = "none";
                game.play();
            }
            if (this.isClickBtn(eventElement, 'game-over-button')) {
                this.gameOverDialog.style.display = "none";
                this.startDialog.style.display = "block";
                game.reset(config);
            }
            if (this.isClickBtn(eventElement, 'btn_rotate'))
                game.roatateTetromino();
            if (this.isClickBtn(eventElement, 'btn_left'))
                game.moveTetrominoLeft();
            if (this.isClickBtn(eventElement, 'btn_right'))
                game.moveTetrominoReght();
            if (this.isClickBtn(eventElement, 'btn_down'))
                game.moveTetrominoDownRedrawField();
            if (this.isClickBtn(eventElement, 'btn_pause'))
                game.makePause();
        });
    }
}
