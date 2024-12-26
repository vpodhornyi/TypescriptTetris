import { Field } from "./field/Field.js";
import { MainField } from "./field/MainField.js";
import { ExtraField } from "./field/ExtraField.js";
import { TetrominoList } from "./tetromino/TetrominoList.js";
import { Game } from "./Game.js";
import { Score } from "./score/Score.js";

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

if (main_field && extra_field && score && level && lines) {
  const mainField: Field = new MainField(main_field, MAIN_FIELD_ROWS, MAIN_FIELD_COLUMNS, CELLS_SELECTOR_MAIN);
  const extraField: Field = new ExtraField(extra_field, EXTRA_FIELD_ROWS, EXTRA_FIELD_COLUMNS, CELLS_SELECTOR_EXTRA);
  const tetrominoList: TetrominoList = new TetrominoList();
  const scoreLevelLines: Score = new Score(score, level, lines);
  const game: Game = new Game(mainField, extraField, tetrominoList, scoreLevelLines);

  game.play();
}
