import type { Cell, Direction } from '@/types/snake';

export const GRID_WIDTH = 20;
export const GRID_HEIGHT = 20;
export const CELL_SIZE = 24; // px

export const INITIAL_SNAKE: Cell[] = [
  { x: 10, y: 10 },
  { x: 9, y: 10 },
  { x: 8, y: 10 },
];

export const INITIAL_DIRECTION: Direction = 'right';

export const INITIAL_TICK_MS = 160;
export const MIN_TICK_MS = 60;
export const SPEED_UP_PER_FOOD = 4; // ms shaved per food

export const HIGH_SCORE_KEY = 'snake.highScore.v1';
