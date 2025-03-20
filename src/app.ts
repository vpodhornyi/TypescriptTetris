import {Field} from "./field/Field.js";
import {MainField} from "./field/MainField.js";
import {ExtraField} from "./field/ExtraField.js";
import {TetrominoList} from "./tetromino/TetrominoList.js";
import {Game} from "./Game.js";
import {Score} from "./score/Score.js";
import {EventKey as KEY} from "./EventKey.js";
import {Config as config} from './Config.js';
import {Elements} from './Elements.js';

const container = document.querySelector('#container') as HTMLElement;
const startDialog = document.querySelector('#start_dialog') as HTMLElement;
const gameOvertDialog = document.querySelector('#game_over_dialog') as HTMLElement;
const main_field = document.querySelector('#main_field') as HTMLElement;
const extra_field = document.querySelector('#extra_field') as HTMLElement;
const score = document.querySelector('#score') as HTMLElement;
const level = document.querySelector('#level') as HTMLElement;
const lines = document.querySelector('#lines') as HTMLElement;
const pause = document.querySelector('#pause') as HTMLElement;

function isClickBtn(e: HTMLElement, className: string): boolean {
  return e?.classList.contains(className);
}

const mainField: Field = new MainField(main_field, config);
const extraField: Field = new ExtraField(extra_field, config);
const tetrominoList: TetrominoList = new TetrominoList();
const scoreLevelLines: Score = new Score(score, level, lines, config);
const game: Game = new Game(mainField, extraField, tetrominoList, scoreLevelLines, gameOvertDialog);
game.init(pause);

const elements: Elements = Elements.getElements(config);
console.log(elements);

container.addEventListener('click', (event: Event) => {
  const eventElement = event.target as HTMLElement;

  if (isClickBtn(eventElement, 'start-button')) {
    startDialog.style.display = "none";
    game.play();
  }

  if (isClickBtn(eventElement, 'game-over-button')) {
    gameOvertDialog.style.display = "none";
    startDialog.style.display = "block";
    game.reset();
  }

  if (isClickBtn(eventElement, 'btn_rotate')) game.controlsTetromino(KEY.UP);
  if (isClickBtn(eventElement, 'btn_left')) game.controlsTetromino(KEY.LEFT);
  if (isClickBtn(eventElement, 'btn_right')) game.controlsTetromino(KEY.RIGHT);
  if (isClickBtn(eventElement, 'btn_down')) game.controlsTetromino(KEY.DOWN);
  if (isClickBtn(eventElement, 'btn_pause')) game.makePause(pause);
})
