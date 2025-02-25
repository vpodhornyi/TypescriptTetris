import {Field} from "./field/Field.js";
import {MainField} from "./field/MainField.js";
import {ExtraField} from "./field/ExtraField.js";
import {TetrominoList} from "./tetromino/TetrominoList.js";
import {Game} from "./Game.js";
import {Score} from "./score/Score.js";
import {EventKey as KEY} from "./EventKey.js";

const START_SCORE = 0;
const START_LEVEL = 1;
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

const container = document.querySelector('#container') as HTMLElement;
const startDialog = document.querySelector('#start_dialog') as HTMLElement;
const main_field = document.querySelector('#main_field') as HTMLElement;
const extra_field = document.querySelector('#extra_field') as HTMLElement;
const score = document.querySelector('#score') as HTMLElement;
const level = document.querySelector('#level') as HTMLElement;
const lines = document.querySelector('#lines') as HTMLElement;
const pause = document.querySelector('#pause') as HTMLElement;

function isClickBtn(e: HTMLElement, className: string): boolean {
  return e?.classList.contains(className);
}

const mainField: Field = new MainField(main_field, MAIN_FIELD_ROWS, MAIN_FIELD_COLUMNS, CELLS_SELECTOR_MAIN);
const extraField: Field = new ExtraField(extra_field, EXTRA_FIELD_ROWS, EXTRA_FIELD_COLUMNS, CELLS_SELECTOR_EXTRA);
const tetrominoList: TetrominoList = new TetrominoList();
const scoreLevelLines: Score = new Score(score, level, lines,
  START_SCORE, START_LEVEL, START_SPEED, SCORE_STEP, SPEED_STEP, LEVEL_STEP,
  SCORE_LEVEL_INCREASE);
const game: Game = new Game(mainField, extraField, tetrominoList, scoreLevelLines);

container.addEventListener('click', (event: Event) => {
  const eventElement = event.target as HTMLElement;

  if (isClickBtn(eventElement, 'start-button')) {
    startDialog.style.display = "none"
    game.play(pause);
  }

  if (isClickBtn(eventElement, 'btn_rotate')) game.controlsTetromino(KEY.UP);
  if (isClickBtn(eventElement, 'btn_left')) game.controlsTetromino(KEY.LEFT);
  if (isClickBtn(eventElement, 'btn_right')) game.controlsTetromino(KEY.RIGHT);
  if (isClickBtn(eventElement, 'btn_down')) game.controlsTetromino(KEY.DOWN);
  if (isClickBtn(eventElement, 'btn_pause')) game.makePause(pause);
})
