import {Field} from "./field/Field.js";
import {MainField} from "./field/MainField.js";
import {ExtraField} from "./field/ExtraField.js";
import {TetrominoList} from "./tetromino/TetrominoList.js";
import {Game} from "./Game.js";
import {Score} from "./score/Score.js";

const START_SCORE = 0;
const START_LEVEL = 0;
const START_SPEED = 1000;
const SCORE_STEP = 100;
const SPEED_STEP = 25;
const LEVEL_STEP = 1;
const SCORE_LEVEL_INCREASE = 500;
const MAIN_FIELD_ROWS: number = 20;
const MAIN_FIELD_COLUMNS: number = 10;
const EXTRA_FIELD_ROWS: number = 6;
const EXTRA_FIELD_COLUMNS: number = 6;
const CELLS_SELECTOR_MAIN: string = '#main_field div';
const CELLS_SELECTOR_EXTRA: string = '#extra_field div';

const main_field: Element | null = document.querySelector('#main_field');
const extra_field: Element | null = document.querySelector('#extra_field');
const score: Element | null = document.querySelector('#score');
const level: Element | null = document.querySelector('#level');
const lines: Element | null = document.querySelector('#lines');
const pause: Element | null = document.querySelector('#pause');

if (main_field && extra_field && score && level && lines && pause) {
  const mainField: Field = new MainField(main_field, MAIN_FIELD_ROWS, MAIN_FIELD_COLUMNS, CELLS_SELECTOR_MAIN);
  const extraField: Field = new ExtraField(extra_field, EXTRA_FIELD_ROWS, EXTRA_FIELD_COLUMNS, CELLS_SELECTOR_EXTRA);
  const tetrominoList: TetrominoList = new TetrominoList();
  const scoreLevelLines: Score = new Score(score, level, lines,
    START_SCORE, START_LEVEL, START_SPEED, SCORE_STEP, SPEED_STEP, LEVEL_STEP,
    SCORE_LEVEL_INCREASE);
  const game: Game = new Game(mainField, extraField, tetrominoList, scoreLevelLines);

  game.play(pause);
}
