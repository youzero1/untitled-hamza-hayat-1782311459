type Props = {
  score: number;
  highScore: number;
};

export function Scoreboard({ score, highScore }: Props) {
  return (
    <div className="flex gap-3 w-full max-w-md">
      <div className="flex-1 rounded-lg bg-neutral-900/80 border border-neutral-800 px-4 py-3">
        <div className="text-[10px] uppercase tracking-widest text-neutral-500">Score</div>
        <div className="text-2xl font-bold text-emerald-300 tabular-nums">{score}</div>
      </div>
      <div className="flex-1 rounded-lg bg-neutral-900/80 border border-neutral-800 px-4 py-3">
        <div className="text-[10px] uppercase tracking-widest text-neutral-500">Best</div>
        <div className="text-2xl font-bold text-amber-300 tabular-nums">{highScore}</div>
      </div>
    </div>
  );
}
