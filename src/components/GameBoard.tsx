import type { Cell, Direction } from '@/types/snake';
import { CELL_SIZE, GRID_HEIGHT, GRID_WIDTH } from '@/lib/snakeConstants';

type Props = {
  snake: Cell[];
  food: Cell;
  direction: Direction;
};

export function GameBoard({ snake, food, direction }: Props) {
  const widthPx = GRID_WIDTH * CELL_SIZE;
  const heightPx = GRID_HEIGHT * CELL_SIZE;

  const head = snake[0];

  // Eye offsets based on direction
  const eyeStyle = (() => {
    switch (direction) {
      case 'up': return { top: '15%', leftA: '22%', leftB: '62%' };
      case 'down': return { top: '60%', leftA: '22%', leftB: '62%' };
      case 'left': return { top: '22%', leftA: '15%', leftB: '15%', vertical: true };
      case 'right': return { top: '22%', leftA: '60%', leftB: '60%', vertical: true };
    }
  })();

  return (
    <div
      className="relative rounded-xl border border-emerald-900/50 bg-neutral-950 shadow-[0_0_60px_-15px_rgba(16,185,129,0.35)] overflow-hidden"
      style={{
        width: widthPx,
        height: heightPx,
        maxWidth: '90vw',
        maxHeight: '90vw',
      }}
    >
      {/* Checker background */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            'linear-gradient(45deg, #0f1a14 25%, transparent 25%), linear-gradient(-45deg, #0f1a14 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #0f1a14 75%), linear-gradient(-45deg, transparent 75%, #0f1a14 75%)',
          backgroundSize: `${CELL_SIZE * 2}px ${CELL_SIZE * 2}px`,
          backgroundPosition: `0 0, 0 ${CELL_SIZE}px, ${CELL_SIZE}px -${CELL_SIZE}px, -${CELL_SIZE}px 0`,
        }}
      />

      {/* Food */}
      <div
        className="absolute food-pulse"
        style={{
          left: food.x * CELL_SIZE,
          top: food.y * CELL_SIZE,
          width: CELL_SIZE,
          height: CELL_SIZE,
          padding: 3,
        }}
      >
        <div className="w-full h-full rounded-full bg-gradient-to-br from-red-400 to-red-600 shadow-[inset_0_-2px_4px_rgba(0,0,0,0.4)]" />
      </div>

      {/* Snake body */}
      {snake.map((seg, i) => {
        const isHead = i === 0;
        const t = snake.length <= 1 ? 0 : i / (snake.length - 1);
        // Gradient from bright emerald (head) to darker green (tail)
        const lightness = 55 - t * 25; // 55% -> 30%
        const bg = `hsl(152, 70%, ${lightness}%)`;
        return (
          <div
            key={`${seg.x}-${seg.y}-${i}`}
            className="absolute"
            style={{
              left: seg.x * CELL_SIZE,
              top: seg.y * CELL_SIZE,
              width: CELL_SIZE,
              height: CELL_SIZE,
              padding: 1,
            }}
          >
            <div
              className="w-full h-full"
              style={{
                background: bg,
                borderRadius: isHead ? 6 : 4,
                boxShadow: isHead
                  ? '0 0 8px rgba(52, 211, 153, 0.6), inset 0 -2px 3px rgba(0,0,0,0.25)'
                  : 'inset 0 -2px 3px rgba(0,0,0,0.25)',
              }}
            />
          </div>
        );
      })}

      {/* Head eyes (rendered separately to overlay on head) */}
      {head && (
        <div
          className="absolute pointer-events-none"
          style={{
            left: head.x * CELL_SIZE,
            top: head.y * CELL_SIZE,
            width: CELL_SIZE,
            height: CELL_SIZE,
          }}
        >
          <span
            className="absolute bg-neutral-900 rounded-full"
            style={{
              width: 4,
              height: 4,
              top: eyeStyle.top,
              left: eyeStyle.leftA,
            }}
          />
          <span
            className="absolute bg-neutral-900 rounded-full"
            style={{
              width: 4,
              height: 4,
              top: 'vertical' in eyeStyle && eyeStyle.vertical ? '60%' : eyeStyle.top,
              left: eyeStyle.leftB,
            }}
          />
        </div>
      )}
    </div>
  );
}
