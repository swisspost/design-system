export const ElevationTile = (props: { level: number }) => {
  return (
    <div className={`elevation-tile elevation-${props.level}`}>
      <h2 className="h3">Elevation {props.level}</h2>
      <dl>
        <dt>Class</dt>
        <dd>
          <code>.elevation-{props.level}</code>
        </dd>
        <dt>Sass</dt>
        <dd>
          <code>post.$elevation-{props.level}</code>
        </dd>
      </dl>
    </div>
  );
};
