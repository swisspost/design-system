export const ColorSwatch = (props: { color: string }) => (
  <article className="color-square">
    <div className={`color-square__inner bg-${props.color}`}>
      <h3>{props.color}</h3>
    </div>
    <div className="color-square__content">
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
