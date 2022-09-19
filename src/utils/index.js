export const random = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// default grid
export const gridDefault = () => {
  const rows = 18;
  const cols = 10;
  const array = [];

  // fill array with 18 arrays each containing
  // 10 zeros
  for (let row = 0; row < rows; row += 1) {
    array.push([]);
    for (let col = 0; col < cols; col += 1) {
      array[row].push(0);
    }
  }
  return array;
};

// random shape
export const randomShape = () => {
  return random(1, shapes.length - 1);
};

// define block shapes
export const shapes = [
  // none
  [
    [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
  ],

  // I
  [
    [
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],

    [
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
    ],
  ],

  // T
  [
    [
      [0, 0, 0, 0],
      [1, 1, 1, 0],
      [0, 1, 0, 0],
      [0, 0, 0, 0],
    ],

    [
      [0, 1, 0, 0],
      [1, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 0, 0, 0],
    ],

    [
      [0, 1, 0, 0],
      [1, 1, 1, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],

    [
      [0, 1, 0, 0],
      [0, 1, 1, 0],
      [0, 1, 0, 0],
      [0, 0, 0, 0],
    ],
  ],

  // L
  [
    [
      [0, 0, 0, 0],
      [1, 1, 1, 0],
      [1, 0, 0, 0],
      [0, 0, 0, 0],
    ],

    [
      [1, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 0, 0, 0],
    ],

    [
      [0, 0, 1, 0],
      [1, 1, 1, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],

    [
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 1, 0],
      [0, 0, 0, 0],
    ],
  ],

  // J
  [
    [
      [1, 0, 0, 0],
      [1, 1, 1, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],

    [
      [0, 1, 1, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 0, 0, 0],
    ],

    [
      [0, 0, 0, 0],
      [1, 1, 1, 0],
      [0, 0, 1, 0],
      [0, 0, 0, 0],
    ],

    [
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [1, 1, 0, 0],
      [0, 0, 0, 0],
    ],
  ],

  // Z
  [
    [
      [0, 0, 0, 0],
      [1, 1, 0, 0],
      [0, 1, 1, 0],
      [0, 0, 0, 0],
    ],

    [
      [0, 0, 1, 0],
      [0, 1, 1, 0],
      [0, 1, 0, 0],
      [0, 0, 0, 0],
    ],
  ],

  // S
  [
    [
      [0, 0, 0, 0],
      [0, 1, 1, 0],
      [1, 1, 0, 0],
      [0, 0, 0, 0],
    ],

    [
      [0, 1, 0, 0],
      [0, 1, 1, 0],
      [0, 0, 1, 0],
      [0, 0, 0, 0],
    ],
  ],

  // O
  [
    [
      [0, 1, 1, 0],
      [0, 1, 1, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
  ],
];

// default state of game
export const defaultState = () => {
  return {
    grid: gridDefault(),
    shape: randomShape(),
    rotation: 0,
    x: 5,
    y: -4,
    nextShape: randomShape(),
    isRunning: true,
    score: 0,
    speed: 1000,
    gameOver: false,
  };
};

// returns the next rotation for a shape
export const nextRotation = (shape, rotation) => {
  return (rotation + 1) % shapes[shape].length;
};

export const canMoveTo = (shape, grid, x, y, rotation) => {
  const currentShape = shapes[shape][rotation];
  // loop through all shape's rows and columns
  for (let row = 0; row < currentShape.length; row += 1) {
    for (let col = 0; col < currentShape[row].length; col += 1) {
      // look for 1
      if (currentShape[row][col] !== 0) {
        // x offset on grid
        const proposedX = col + x;
        // y offset on grid
        const proposedY = row + y;
        if (proposedY < 0) {
          continue;
        }
        // get row
        const possibleRow = grid[proposedY];
        // check row exists
        if (possibleRow) {
          // check if row available
          if (
            possibleRow[proposedX] === undefined ||
            possibleRow[proposedX] !== 0
          ) {
            // not available
            return false;
          }
        } else {
          return false;
        }
      }
    }
  }
  return true;
};

export const addBlockToGrid = (shape, grid, x, y, rotation) => {
  const block = shapes[shape][rotation];
  const newGrid = [...grid];
  for (let row = 0; row < block.length; row += 1) {
    for (let col = 0; col < block[row].length; col += 1) {
      if (block[row][col]) {
        newGrid[row + y][col + x] = shape;
      }
    }
  }
  return newGrid;
};

export const checkRows = (grid) => {
  const points = [0, 40, 100, 300, 1200];
  let completedRows = 0;
  for (let row = 0; row < grid.length; row += 1) {
    if (grid[row].indexOf(0) === -1) {
      completedRows += 1;
      grid.splice(row, 1);
      grid.unShift(Array(10).fill(0));
    }
  }
  return points[completedRows];
};
