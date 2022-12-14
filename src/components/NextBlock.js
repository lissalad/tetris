import GridSquare from "./GridSquare";
import { useSelector } from "react-redux";
import { shapes } from "../utils";

export default function NextBlock(props) {
  const nextShape = useSelector((state) => state.game.nextShape);
  const box = shapes[nextShape][0]; // Get the first rotation

  // const box = [[0,0,0,0], [0,0,0,0], [0,0,0,0], [0,0,0,0]]
  const grid = box.map((rowArray, row) => {
    return rowArray.map((square, col) => {
      if (square === 0) {
        return <GridSquare key={`${row}${col}`} color="0" />;
      }
      return <GridSquare key={`${row}${col}`} color={nextShape} />;
    });
  });

  return <div className="next-block">{grid}</div>;
}
