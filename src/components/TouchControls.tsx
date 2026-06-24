import type { Direction } from '@/types/snake';

type Props = {
  onDirection: (d: Direction) => void;
};

export function TouchControls({ onDirection }: Props) {
  const btn =
    'w-14 h-14 rounded-xl bg-neutral-800 active:bg-emerald-600 border border-neutral-700 text-emerald-300 active:text-neutral-950 flex items-center justify-center text-2xl font-bold select-none transition-colors';

  return (
    <div className="mt-6 md:hidden grid grid-cols-3 gap-2 w-44">
      <div />
      <button
        type="button"
        aria-label="Up"
        onTouchStart={(e) => { e.preventDefault(); onDirection('up'); }}
        onClick={() => onDirection('up')}
        className={btn}
      >
        ▲
      </button>
      <div />
      <button
        type="button"
        aria-label="Left"
        onTouchStart={(e) => { e.preventDefault(); onDirection('left'); }}
        onClick={() => onDirection('left')}
        className={btn}
      >
        ◀
      </button>
      <div />
      <button
        type="button"
        aria-label="Right"
        onTouchStart={(e) => { e.preventDefault(); onDirection('right'); }}
        onClick={() => onDirection('right')}
        className={btn}
      >
        ▶
      </button>
      <div />
      <button
        type="button"
        aria-label="Down"
        onTouchStart={(e) => { e.preventDefault(); onDirection('down'); }}
        onClick={() => onDirection('down')}
        className={btn}
      >
        ▼
      </button>
      <div />
    </div>
  );
}
