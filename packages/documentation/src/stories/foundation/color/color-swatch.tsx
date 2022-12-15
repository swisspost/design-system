export const ColorSwatch = (props: { color: string; isBackground?: boolean }) => {
  const isBackground = props.isBackground ?? true;

  return (
    <article className="color-square">
      <div
        className={isBackground ? `color-square__inner bg-${props.color}` : 'color-square__inner'}
        style={!isBackground ? { backgroundColor: `var(--post-${props.color})` } : undefined}
      >
        {isBackground && <h3>{props.color}</h3>}
      </div>
      <div className="color-square__content">
        {!isBackground && <h3>{props.color}</h3>}
        <dl>
          <dt>CSS</dt>
          <dd>
            <code>var(--post-{props.color})</code>
          </dd>
          <dt>Sass</dt>
          <dd>
            <code>post.${props.color}</code>
          </dd>
        </dl>
      </div>
    </article>
  );
};
