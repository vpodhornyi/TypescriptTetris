import { TetrominoName } from "./TetrominoName.js";

export const TetrominoMatrix = {
  [TetrominoName.I]: [
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
  [TetrominoName.O]: [
    [1, 1],
    [1, 1]
  ],
  [TetrominoName.T]: [
    [1, 1, 1],
    [0, 1, 0],
    [0, 0, 0]
  ],
  [TetrominoName.J]: [
    [0, 0, 1],
    [0, 0, 1],
    [0, 1, 1]
  ],
  [TetrominoName.L]: [
    [1, 0, 0],
    [1, 0, 0],
    [1, 1, 0]
  ],
  [TetrominoName.S]: [
    [0, 1, 1],
    [0, 1, 0],
    [1, 1, 0]
  ],
  [TetrominoName.Z]: [
    [1, 1, 0],
    [0, 1, 0],
    [0, 1, 1]
  ],
}
