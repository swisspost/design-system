export function DisplayContainer(props: { name: string }) {
  return (
    <article className="display-container">
      <div className="display-container__description">
        <h3 className="description__title h6">{props.name}</h3>
      </div>
      <div className="display-container__display">
        <div className={`display__tile d-${props.name}`}>Text</div>
        <div className={`display__tile d-${props.name}`}>Text</div>
      </div>
      <div className="display-container__props">
        <dl>
          <dt>Class</dt>
          <dd>
            <code>.d-{props.name}</code>
          </dd>
        </dl>
      </div>
    </article>
  );
}
