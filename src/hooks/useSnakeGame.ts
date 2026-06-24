import { useCallback, useEffect, useRef, useState } from 'react';
import type { Cell, Direction, GameStatus } from '@/types/snake';
import {
  HIGH_SCORE_KEY,
  INITIAL_DIRECTION,
  INITIAL_SNAKE,
  INITIAL_TICK_MS,
  MIN_TICK_MS,
  SPEED_UP_PER_FOOD,
} from '@/lib/snakeConstants';
import {
  canChangeDirection,
  hitsSelf,
  hitsWall,
  nextHead,
  randomFood,
} from '@/lib/snakeLogic';

type State = {
  snake: Cell[];
  direction: Direction;
  food: Cell;
  score: number;
  highScore: number;
  status: GameStatus;
  tickMs: number;
  justBeatHighScore: boolean;
};

function loadHighScore(): number {
  try {
    const v = localStorage.getItem(HIGH_SCORE_KEY);
    if (!v) return 0;
    const n = parseInt(v, 10);
    return Number.isFinite(n) ? n : 0;
  } catch {
    return 0;
  }
}

function saveHighScore(n: number) {
  try {
    localStorage.setItem(HIGH_SCORE_KEY, String(n));
  } catch {
    // ignore
  }
}

function freshState(highScore: number): State {
  const snake = INITIAL_SNAKE.map((c) => ({ ...c }));
  return {
    snake,
    direction: INITIAL_DIRECTION,
    food: randomFood(snake),
    score: 0,
    highScore,
    status: 'idle',
    tickMs: INITIAL_TICK_MS,
    justBeatHighScore: false,
  };
}

export function useSnakeGame() {
  const [state, setState] = useState<State>(() => freshState(loadHighScore()));
  // queued next direction — applied at the next tick so rapid taps don't cause 180° reversal
  const queuedDirRef = useRef<Direction | null>(null);
  const stateRef = useRef(state);
  stateRef.current = state;

  const tick = useCallback(() => {
    setState((prev) => {
      if (prev.status !== 'playing') return prev;

      // Apply queued direction if valid
      let dir = prev.direction;
      const queued = queuedDirRef.current;
      if (queued && canChangeDirection(dir, queued)) {
        dir = queued;
      }
      queuedDirRef.current = null;

      const head = nextHead(prev.snake[0], dir);

      // wall collision
      if (hitsWall(head)) {
        const newHigh = Math.max(prev.highScore, prev.score);
        const beat = prev.score > prev.highScore && prev.score > 0;
        if (beat) saveHighScore(newHigh);
        return {
          ...prev,
          status: 'gameOver',
          highScore: newHigh,
          justBeatHighScore: beat,
        };
      }

      const willEat = head.x === prev.food.x && head.y === prev.food.y;

      // body to check collision against: all current segments except the tail (which will move),
      // UNLESS we're eating (snake grows, tail stays).
      const bodyForCollision = willEat ? prev.snake : prev.snake.slice(0, -1);
      if (hitsSelf(head, bodyForCollision)) {
        const newHigh = Math.max(prev.highScore, prev.score);
        const beat = prev.score > prev.highScore && prev.score > 0;
        if (beat) saveHighScore(newHigh);
        return {
          ...prev,
          status: 'gameOver',
          highScore: newHigh,
          justBeatHighScore: beat,
        };
      }

      const newSnake = [head, ...prev.snake];
      if (!willEat) newSnake.pop();

      let newFood = prev.food;
      let newScore = prev.score;
      let newTick = prev.tickMs;
      if (willEat) {
        newScore = prev.score + 1;
        newFood = randomFood(newSnake);
        newTick = Math.max(MIN_TICK_MS, prev.tickMs - SPEED_UP_PER_FOOD);
      }

      return {
        ...prev,
        snake: newSnake,
        direction: dir,
        food: newFood,
        score: newScore,
        tickMs: newTick,
      };
    });
  }, []);

  // Game loop — runs while status is 'playing', resets cadence whenever tickMs changes
  useEffect(() => {
    if (state.status !== 'playing') return;
    const id = window.setInterval(tick, state.tickMs);
    return () => window.clearInterval(id);
  }, [state.status, state.tickMs, tick]);

  const start = useCallback(() => {
    setState((prev) => {
      if (prev.status === 'playing') return prev;
      if (prev.status === 'paused') return { ...prev, status: 'playing' };
      // idle or gameOver: start fresh, but keep highScore
      const fresh = freshState(prev.highScore);
      return { ...fresh, status: 'playing' };
    });
  }, []);

  const pause = useCallback(() => {
    setState((prev) => (prev.status === 'playing' ? { ...prev, status: 'paused' } : prev));
  }, []);

  const togglePause = useCallback(() => {
    setState((prev) => {
      if (prev.status === 'playing') return { ...prev, status: 'paused' };
      if (prev.status === 'paused') return { ...prev, status: 'playing' };
      if (prev.status === 'idle' || prev.status === 'gameOver') {
        const fresh = freshState(prev.highScore);
        return { ...fresh, status: 'playing' };
      }
      return prev;
    });
  }, []);

  const reset = useCallback(() => {
    setState((prev) => freshState(prev.highScore));
  }, []);

  const setDirection = useCallback((dir: Direction) => {
    const cur = stateRef.current;
    if (cur.status !== 'playing') return;
    // queue the next direction; tick will validate against the direction at that moment
    queuedDirRef.current = dir;
  }, []);

  return {
    ...state,
    start,
    pause,
    togglePause,
    reset,
    setDirection,
  };
}

export type SnakeGame = ReturnType<typeof useSnakeGame>;
