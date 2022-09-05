export default function GridsSquare(props) {
  const classes = `grid-square color-${props.color}`;
  return <div className={classes} />;
}
