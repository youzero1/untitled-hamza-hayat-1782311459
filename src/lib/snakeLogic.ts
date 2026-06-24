import type { Cell, Direction } from '@/types/snake';
import { GRID_HEIGHT, GRID_WIDTH } from '@/lib/snakeConstants';

export function randomFood(snake: Cell[]): Cell {
  const occupied = new Set(snake.map((c) => `${c.x},${c.y}`));
  const free: Cell[] = [];
  for (let x = 0; x < GRID_WIDTH; x++) {
    for (let y = 0; y < GRID_HEIGHT; y++) {
      if (!occupied.has(`${x},${y}`)) free.push({ x, y });
    }
  }
  if (free.length === 0) return { x: 0, y: 0 };
  return free[Math.floor(Math.random() * free.length)];
}

export function nextHead(head: Cell, dir: Direction): Cell {
  switch (dir) {
    case 'up': return { x: head.x, y: head.y - 1 };
    case 'down': return { x: head.x, y: head.y + 1 };
    case 'left': return { x: head.x - 1, y: head.y };
    case 'right': return { x: head.x + 1, y: head.y };
  }
}

export function hitsWall(c: Cell): boolean {
  return c.x < 0 || c.y < 0 || c.x >= GRID_WIDTH || c.y >= GRID_HEIGHT;
}

export function hitsSelf(head: Cell, body: Cell[]): boolean {
  // body includes the head's old segments; exclude the tail when the snake will move
  return body.some((c) => c.x === head.x && c.y === head.y);
}

export function isOpposite(a: Direction, b: Direction): boolean {
  return (
    (a === 'up' && b === 'down') ||
    (a === 'down' && b === 'up') ||
    (a === 'left' && b === 'right') ||
    (a === 'right' && b === 'left')
  );
}

export function canChangeDirection(current: Direction, next: Direction): boolean {
  if (current === next) return false;
  if (isOpposite(current, next)) return false;
  return true;
}
