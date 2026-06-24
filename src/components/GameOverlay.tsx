import type { GameStatus } from '@/types/snake';

type Props = {
  status: GameStatus;
  score: number;
  highScore: number;
  justBeatHighScore: boolean;
  onStart: () => void;
};

export function GameOverlay({ status, score, highScore, justBeatHighScore, onStart }: Props) {
  if (status === 'playing') return null;

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-neutral-950/70 backdrop-blur-sm rounded-xl">
      <div className="text-center px-6 max-w-sm">
        {status === 'idle' && (
          <>
            <h2 className="text-2xl font-bold text-emerald-300 mb-2">Ready?</h2>
            <p className="text-sm text-neutral-400 mb-5">
              Use arrow keys or WASD to steer. Eat food to grow longer.
            </p>
            <button
              onClick={onStart}
              className="px-6 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 text-neutral-950 font-semibold transition-colors"
            >
              Start
            </button>
            <p className="text-xs text-neutral-500 mt-3">or press Space</p>
          </>
        )}

        {status === 'paused' && (
          <>
            <h2 className="text-2xl font-bold text-amber-300 mb-2">Paused</h2>
            <button
              onClick={onStart}
              className="mt-2 px-6 py-2.5 rounded-lg bg-amber-400 hover:bg-amber-300 active:bg-amber-500 text-neutral-950 font-semibold transition-colors"
            >
              Resume
            </button>
            <p className="text-xs text-neutral-500 mt-3">or press Space</p>
          </>
        )}

        {status === 'gameOver' && (
          <>
            <h2 className="text-2xl font-bold text-red-400 mb-2">Game Over</h2>
            {justBeatHighScore && (
              <div className="inline-block mb-3 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-semibold uppercase tracking-wider">
                ★ New High Score!
              </div>
            )}
            <div className="text-sm text-neutral-300 mb-1">
              Score: <span className="text-emerald-300 font-bold">{score}</span>
            </div>
            <div className="text-sm text-neutral-300 mb-5">
              Best: <span className="text-amber-300 font-bold">{highScore}</span>
            </div>
            <button
              onClick={onStart}
              className="px-6 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 text-neutral-950 font-semibold transition-colors"
            >
              Play Again
            </button>
            <p className="text-xs text-neutral-500 mt-3">or press Space</p>
          </>
        )}
      </div>
    </div>
  );
}
