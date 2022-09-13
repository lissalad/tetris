import GridSquare from "./GridSquare";
import { shapes } from "../utils";

import { useSelector } from "react-redux";

export default function GridBoard(props) {
  const game = useSelector((state) => state.game);
  const { grid, shape, rotation, x, y, isRunning, speed } = game;
  const block = shapes[shape][rotation];
  const blockColor = shape;
  // map rows
  const gridSquares = grid.map((rowArray, row) => {
    // map columns
    return rowArray.map((square, col) => {
      // get block's position
      const blockX = col - x;
      const blockY = row - y;
      let color = square;
      // map current falling block
      if (
        blockX >= 0 &&
        blockX < block.length &&
        blockY >= 0 &&
        blockY < block.length
      ) {
        color = block[blockY][blockX] === 0 ? color : blockColor;
      }
      // generate a unique key for each block
      const k = row * grid[0].length + col;
      // generate a grid square
      return <GridSquare key={k} color={color} />;
    });
  });

  return <div className="grid-board">{gridSquares}</div>;
}
