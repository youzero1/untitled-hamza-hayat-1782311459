import { useEffect } from 'react';
import type { Direction } from '@/types/snake';

type Handlers = {
  setDirection: (d: Direction) => void;
  togglePause: () => void;
  reset: () => void;
};

export function useKeyboardControls({ setDirection, togglePause, reset }: Handlers) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const k = e.key;
      // Prevent page scroll on arrows and space
      if (
        k === 'ArrowUp' || k === 'ArrowDown' || k === 'ArrowLeft' || k === 'ArrowRight' ||
        k === ' ' || k === 'Spacebar'
      ) {
        e.preventDefault();
      }

      switch (k) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          setDirection('up');
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          setDirection('down');
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          setDirection('left');
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          setDirection('right');
          break;
        case ' ':
        case 'Spacebar':
          togglePause();
          break;
        case 'r':
        case 'R':
          reset();
          break;
      }
    }
    window.addEventListener('keydown', onKey, { passive: false });
    return () => window.removeEventListener('keydown', onKey);
  }, [setDirection, togglePause, reset]);
}
