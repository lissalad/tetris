export default function GridsQuare(props) {
  const classes = `grid-square color-${props.color}`;
  return <div className={classes} />;
}
