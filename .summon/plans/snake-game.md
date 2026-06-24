---
status: building
title: Classic Snake Game
---

1. Update `/app/src/styles/global.css` to ensure it starts with `@import "tailwindcss";` and add a subtle full-page dark background plus centering helpers used by the game shell.
   - Outcome: the page has a dark, neutral background suited to a retro arcade game.

2. Create `/app/src/types/snake.ts` defining shared types used across the game:
   - A coordinate type for grid cells (x, y).
   - A direction union (up, down, left, right).
   - A game status union (idle, playing, paused, gameOver).
   - Outcome: a single source of truth for game data shapes.

3. Create `/app/src/lib/snakeConstants.ts` exporting tunable values:
   - Grid width and height (e.g. 20 x 20 cells).
   - Cell pixel size.
   - Initial snake position and length.
   - Initial movement tick speed in milliseconds and a minimum tick speed.
   - Speed-up amount per food eaten.
   - Outcome: gameplay can be tuned in one place without touching components.

4. Create `/app/src/lib/snakeLogic.ts` with pure helper functions (no React):
   - Generate a random food position that avoids snake cells.
   - Compute the next head position given a direction.
   - Detect wall collisions and self collisions.
   - Determine if a direction change is allowed (no instant 180° reversal).
   - Outcome: game rules are isolated and easy to reason about.

5. Create `/app/src/hooks/useSnakeGame.ts` — a custom hook owning all game state:
   - Track snake body, current direction, queued next direction, food position, score, high score, status, and tick speed.
   - Expose start, pause/resume, reset, and a direction setter.
   - Use a single interval/timeout loop that advances the snake one cell per tick while status is "playing".
   - On eating food: grow the snake, increment score, place new food, and slightly increase speed.
   - On collision: set status to gameOver and update high score if beaten.
   - Persist high score in localStorage so it survives reloads.
   - Outcome: a clean API the UI can consume without knowing game internals.

6. Create `/app/src/hooks/useKeyboardControls.ts`:
   - Listen for arrow keys and WASD to change direction.
   - Listen for Space to start/pause/resume, and R to reset.
   - Prevent default scrolling on arrow keys and space.
   - Outcome: keyboard controls feel responsive and don't scroll the page.

7. Create `/app/src/components/GameBoard.tsx`:
   - Render the play area as a CSS grid sized from the grid constants.
   - Draw each snake segment, with a distinct head style (slightly brighter, with eyes or a highlight) and a tail gradient.
   - Draw the food cell with a pulsing glow.
   - Show a subtle checker pattern on empty cells for visual rhythm.
   - Outcome: a crisp, readable game board that clearly shows snake and food.

8. Create `/app/src/components/Scoreboard.tsx`:
   - Display current score and high score side by side with labels.
   - Outcome: the player always sees their progress.

9. Create `/app/src/components/GameOverlay.tsx`:
   - When status is idle, show a "Press Space to Start" prompt with a brief controls legend.
   - When status is paused, show a "Paused" message with resume instructions.
   - When status is gameOver, show final score, a "New High Score!" badge when applicable, and a Play Again button.
   - Use a translucent backdrop over the board so the board stays visible behind.
   - Outcome: clear feedback for every non-playing state.

10. Create `/app/src/components/TouchControls.tsx`:
    - Render a 4-direction D-pad (up/down/left/right) visible on small screens (hidden on md and up).
    - Buttons trigger the same direction setter used by the keyboard.
    - Outcome: the game is playable on mobile/touch devices.

11. Create `/app/src/pages/SnakePage.tsx`:
    - Compose `Scoreboard`, `GameBoard` (with `GameOverlay` layered on top), and `TouchControls`.
    - Wire up `useSnakeGame` and `useKeyboardControls`.
    - Add a header with the game title and a small "How to play" hint row underneath.
    - Center everything in the viewport with comfortable padding.
    - Outcome: a complete, self-contained game screen.

12. Update `/app/src/App.tsx` to render `SnakePage` as the sole screen.
    - Outcome: opening the app launches straight into the game.

13. Verify `/app/src/main.tsx` imports `./styles/global.css` exactly once and renders `App`.
    - Outcome: Tailwind styles load and the game appears correctly.

14. Manual test pass:
    - Start the game with Space, steer with arrow keys and WASD, confirm food spawns away from the snake.
    - Confirm the snake cannot reverse into itself instantly.
    - Confirm score increases, speed ramps up, and game over triggers on wall/self collision.
    - Confirm pause/resume, reset, and that high score persists after refresh.
    - Confirm the D-pad works on a narrow viewport.
    - Outcome: the game is fully playable and polished.
