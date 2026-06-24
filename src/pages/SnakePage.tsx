import { useSnakeGame } from '@/hooks/useSnakeGame';
import { useKeyboardControls } from '@/hooks/useKeyboardControls';
import { GameBoard } from '@/components/GameBoard';
import { Scoreboard } from '@/components/Scoreboard';
import { GameOverlay } from '@/components/GameOverlay';
import { TouchControls } from '@/components/TouchControls';

export default function SnakePage() {
  const game = useSnakeGame();
  useKeyboardControls({
    setDirection: game.setDirection,
    togglePause: game.togglePause,
    reset: game.reset,
  });

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start py-6 px-4 sm:py-10">
      <header className="w-full max-w-xl text-center mb-4 sm:mb-6">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-emerald-300">
          Snake
        </h1>
        <p className="mt-1 text-sm text-neutral-400">
          Arrow keys or WASD to move · Space to start / pause · R to reset
        </p>
      </header>

      <Scoreboard score={game.score} highScore={game.highScore} />

      <div className="relative mt-4">
        <GameBoard snake={game.snake} food={game.food} direction={game.direction} />
        <GameOverlay
          status={game.status}
          score={game.score}
          highScore={game.highScore}
          justBeatHighScore={game.justBeatHighScore}
          onStart={game.start}
        />
      </div>

      <TouchControls onDirection={game.setDirection} />

      <footer className="mt-6 text-xs text-neutral-500 text-center max-w-xs">
        Eat the red food to grow. Don't hit the walls or yourself.
      </footer>
    </div>
  );
}
