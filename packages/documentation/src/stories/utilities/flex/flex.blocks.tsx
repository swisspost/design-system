export function FlexDirectionContainer(props: { name: string }) {
  return (
    <article className="d-flex align-items-start flex-container">
      <div className="flex-container__description">
        <h3 className="description__title h6">{props.name}</h3>
      </div>
      <div className="flex-container__flex">
        <div className={`d-flex flex-${props.name}`}>
          <div className="bg-yellow p-8">First content</div>
          <div className="bg-black p-8">Second content</div>
        </div>
      </div>
      <div className="flex-container__props">
        <dl>
          <dt>Class</dt>
          <dd>
            <code>.flex-{props.name}</code>
          </dd>
        </dl>
      </div>
    </article>
  );
}

export function AlignItemsContainer(props: { name: string }) {
  return (
    <article className="d-flex align-items-start flex-container">
      <div className="flex-container__description">
        <h3 className="description__title h6">{props.name}</h3>
      </div>
      <div className="flex-container__flex">
        <div className={`d-flex align-items-${props.name}`}>
          <div className="bg-yellow p-8">Content</div>
          <div className="bg-black px-8 py-32">Content</div>
        </div>
      </div>
      <div className="flex-container__props">
        <dl>
          <dt>Class</dt>
          <dd>
            <code>.align-items-{props.name}</code>
          </dd>
        </dl>
      </div>
    </article>
  );
}

export function JustifyContentContainer(props: { name: string }) {
  return (
    <article className="d-flex align-items-start flex-container">
      <div className="flex-container__description">
        <h3 className="description__title h6">{props.name}</h3>
      </div>
      <div className="flex-container__flex">
        <div className={`d-flex justify-content-${props.name}`}>
          <div className="bg-yellow p-8">Content</div>
          <div className="bg-black p-8">Content</div>
        </div>
      </div>
      <div className="flex-container__props">
        <dl>
          <dt>Class</dt>
          <dd>
            <code>.justify-content-{props.name}</code>
          </dd>
        </dl>
      </div>
    </article>
  );
}

export function AlignSelfContainer(props: { name: string }) {
  return (
    <article className="d-flex align-items-start flex-container">
      <div className="flex-container__description">
        <h3 className="description__title h6">{props.name}</h3>
      </div>
      <div className="flex-container__flex">
        <div className="d-flex align-items-start">
          <div className="bg-black px-8 py-32">Content</div>
          <div className={`bg-yellow p-8 align-self-${props.name}`}>Content with align-self</div>
          <div className="bg-black px-8 py-32">Content</div>
        </div>
      </div>
      <div className="flex-container__props">
        <dl>
          <dt>Class</dt>
          <dd>
            <code>.align-self-{props.name}</code>
          </dd>
        </dl>
      </div>
    </article>
  );
}

export function GrowShrinkContainer(props: { name: string; value: string }) {
  return (
    <article className="d-flex align-items-start flex-container">
      <div className="flex-container__description">
        <h3 className="description__title h6">
          {props.name} {props.value}
        </h3>
      </div>
      <div className="flex-container__flex">
        <div className="d-flex align-items-start">
          <div className="bg-black px-8 py-32">Content</div>
          <div className={`bg-yellow p-8 flex-${props.name}-${props.value}`}>
            Content with custom {props.name}
          </div>
          <div className="bg-black px-8 py-32">Content</div>
        </div>
      </div>
      <div className="flex-container__props">
        <dl>
          <dt>Class</dt>
          <dd>
            <code>
              .flex-{props.name}-{props.value}
            </code>
          </dd>
        </dl>
      </div>
    </article>
  );
}
