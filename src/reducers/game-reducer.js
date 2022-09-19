import {
  defaultState,
  nextRotation,
  canMoveTo,
  addBlockToGrid,
  checkRows,
  randomShape,
} from "../utils";
import {
  MOVE_RIGHT,
  MOVE_LEFT,
  MOVE_DOWN,
  ROTATE,
  PAUSE,
  RESUME,
  RESTART,
  GAME_OVER,
} from "../actions";

const gameReducer = (state = defaultState(), action) => {
  const { shape, grid, x, y, rotation, nextShape, score, isRunning } = state;

  switch (action.type) {
    // rotate
    case ROTATE:
      const newRotation = nextRotation(shape, rotation);
      // check if rotation possible
      if (canMoveTo(shape, grid, x, y, newRotation)) {
        return { ...state, rotation: newRotation };
      }
      return state;

    // move right
    case MOVE_RIGHT:
      // add 1 to x, see if possible
      if (canMoveTo(shape, grid, x + 1, y, rotation)) {
        return { ...state, x: x + 1 };
      }
      return state;

    // move left
    case MOVE_LEFT:
      // subtract 1 from x, check if possible
      if (canMoveTo(shape, grid, x - 1, y, rotation)) {
        return { ...state, x: x - 1 };
      }
      return state;

    // move down
    case MOVE_DOWN:
      // Get the next potential Y position
      const maybeY = y + 1;
      // Check if the current block can move here
      if (canMoveTo(shape, grid, x, maybeY, rotation)) {
        // If so move the block
        return { ...state, y: maybeY };
      }
      // If not place the block
      const newGrid = addBlockToGrid(shape, grid, x, y, rotation);
      // reset some things to start a new shape/block
      const newState = defaultState();
      newState.grid = newGrid;
      newState.shape = nextShape;
      newState.nextShape = randomShape();
      newState.score = score;
      newState.isRunning = isRunning;

      if (!canMoveTo(nextShape, newGrid, 0, 4, 0)) {
        // Game Over
        console.log("Game Should be over...");
        newState.shape = 0;
        return { ...state, gameOver: true };
      }
      // Update the score based on if rows were completed or not
      newState.score = score + checkRows(newGrid);
      return newState;

    case RESUME:
      return { ...state, isRunning: true };

    case PAUSE:
      return { ...state, isRunning: false };

    case GAME_OVER:
      return state;
    case RESTART:
      return state;
    default:
      return state;
  }
};

export default gameReducer;
