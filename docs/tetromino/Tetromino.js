export class Tetromino {
    constructor(name, matrix) {
        this._row = 0;
        this._column = 0;
        this._name = name;
        this._matrix = matrix;
        this._matrixLength = matrix.length;
    }
    set row(value) {
        this._row = value;
    }
    set column(value) {
        this._column = value;
    }
    get name() {
        return this._name;
    }
    get matrix() {
        return this._matrix;
    }
    get row() {
        return this._row;
    }
    get column() {
        return this._column;
    }
    get matrixLength() {
        return this._matrixLength;
    }
    rotateMatrix() {
        const rotateMatrix = [];
        for (let i = 0; i < this._matrixLength; i++) {
            rotateMatrix[i] = [];
            for (let j = 0; j < this._matrixLength; j++) {
                rotateMatrix[i][j] = this._matrix[this._matrixLength - j - 1][i];
            }
        }
        return rotateMatrix;
    }
    rotate(field) {
        const tmpMatrix = this.matrix;
        this._matrix = this.rotateMatrix();
        if (!this.isValid(field))
            this._matrix = tmpMatrix;
        return this;
    }
    moveLeft(field) {
        this._column--;
        if (!this.isValid(field))
            this._column++;
    }
    moveRight(field) {
        this._column++;
        if (!this.isValid(field))
            this._column--;
    }
    moveDown(field) {
        this._row++;
        if (!this.isValid(field)) {
            this._row--;
            return true;
        }
        return false;
    }
    isValid(field) {
        for (let row = 0; row < this._matrixLength; row++) {
            for (let column = 0; column < this._matrixLength; column++) {
                if (this.isOutsideOfGameboard(row, column, field))
                    return false;
                if (this.hasCollisions(row, column, field))
                    return false;
            }
        }
        return true;
    }
    isOutsideOfGameboard(row, column, field) {
        return this._matrix[row][column] &&
            (this._column + column < 0
                || this._column + column >= field.columns
                || this._row + row >= field.rows);
    }
    hasCollisions(row, column, field) {
        return this._matrix[row][column]
            && field.playFieldArr[this._row + row] && field.playFieldArr[this._row + row][this._column + column];
    }
}
