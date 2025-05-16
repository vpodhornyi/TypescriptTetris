const DIV = 'div';
const CLASS_TETROMINO = 'block';
const CLASS = 'class';
export class Field {
    constructor(root, rows, columns, cellSelector) {
        this._rows = rows;
        this._columns = columns;
        this._playFieldArr = new Array(this._rows)
            .fill(0)
            .map(() => new Array(this._columns).fill(0));
        this._amount = this._rows * this._columns;
        this.generateField(root);
        this.cells = Array.from(document.querySelectorAll(cellSelector));
        this._rowCount = 0;
    }
    get rows() {
        return this._rows;
    }
    get columns() {
        return this._columns;
    }
    get playFieldArr() {
        return this._playFieldArr;
    }
    clearField() {
        this.cells.forEach(cell => cell.removeAttribute(CLASS));
    }
    convertPositionToIndex(row, column) {
        return row * this._columns + column;
    }
    drawTetromino(tetromino) {
        const ln = tetromino.matrix.length;
        for (let r = 0; r < ln; r++) {
            for (let c = 0; c < ln; c++) {
                if (!tetromino.matrix[r][c])
                    continue;
                const cellIndex = this.convertPositionToIndex(tetromino.row + r, tetromino.column + c);
                this.cells[cellIndex] && this.cells[cellIndex].classList.add(tetromino.name, CLASS_TETROMINO);
            }
        }
    }
    deleteFullRows(isFullRow, score, row) {
        if (isFullRow) {
            this._playFieldArr.splice(row, 1);
            this._playFieldArr.unshift(new Array(this._columns).fill(0));
            this.clearField();
            for (let row = 0; row < this._rows; row++) {
                for (let column = 0; column < this._columns; column++) {
                    if (this._playFieldArr[row][column] == 0)
                        continue;
                    const name = this._playFieldArr[row][column];
                    const cellIndex = this.convertPositionToIndex(row, column);
                    this.cells[cellIndex].classList.add(name, CLASS_TETROMINO);
                }
            }
            this._rowCount += 1;
            score.setLines(this._rowCount);
            score.setScore();
            if (score.isNewLevel()) {
                score.setLevel();
            }
            return true;
        }
        return false;
    }
    drawField(score) {
        let res = false;
        for (let row = 0; row < this._rows; row++) {
            let columnsCaunt = this._columns;
            for (let column = 0; column < this._columns; column++) {
                if (this._playFieldArr[row][column] === 0)
                    continue;
                columnsCaunt -= 1;
                const name = this._playFieldArr[row][column];
                const cellIndex = this.convertPositionToIndex(row, column);
                this.cells[cellIndex].classList.add(name, CLASS_TETROMINO);
                res = this.deleteFullRows(columnsCaunt === 0, score, row);
            }
        }
        return res;
    }
    isGameOver() {
        let res = false;
        for (let column = 0; column < this._columns; column++) {
            if (this._playFieldArr[0][column] !== 0) {
                res = true;
                break;
            }
        }
        return res;
    }
    addTetromino(tetromino) {
        this.setToCenter(tetromino);
        this.drawTetromino(tetromino);
    }
    placeTetromino(tetromino) {
        for (let row = 0; row < tetromino.matrixLength; row++) {
            for (let column = 0; column < tetromino.matrixLength; column++) {
                if (tetromino.matrix[row][column]) {
                    this._playFieldArr[tetromino.row + row] && (this._playFieldArr[tetromino.row + row][tetromino.column + column] = tetromino.name);
                }
            }
        }
    }
    resetField() {
        this._playFieldArr.forEach(arr => arr.fill(0)
            .map(() => new Array(this._columns).fill(0)));
    }
    generateField(el) {
        for (let i = 0; i < this._amount; i++) {
            el.append(document.createElement(DIV));
        }
    }
}
