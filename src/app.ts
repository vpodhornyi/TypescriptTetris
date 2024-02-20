import { Field } from "./Field.js";
import {tetrominos} from "./tetromino/Tetromino.js";

const EVENT_KEY_DOWN = 'keydown';
const root: Element | null = document.querySelector('#root');

if (root) {
  const field = new Field(root);
  const tetromino = tetrominos[6];

  field.drawTetromino(tetromino);
  document.addEventListener(EVENT_KEY_DOWN, field.onKeyDown(tetromino));
}
