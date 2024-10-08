import { breakpoints } from '../spacing/spacing.docs.mdx';

const FlexDocContainer = (props: {
  children: string | JSX.Element | JSX.Element[];
  name: string;
  prefix: string;
}) => (
  <article className="d-flex flex-column flex-lg-row align-items-start flex-doc-container">
    <div className="flex-doc-container__description order-2 order-lg-1">
      <h3 className="h6 text-capitalize">{props.name}</h3>
    </div>
    <div className="flex-doc-container__demo order-3 order-lg-2">{props.children}</div>
    <div className="flex-doc-container__props order-1 order-lg-3">
      <dl>
        <dt>Class</dt>
        <dd>
          <code>
            .{props.prefix}-{props.name}
          </code>
        </dd>
      </dl>
    </div>
  </article>
);

export function FlexBreakpointBlock(props: { display: string }) {
  return (
    <>
      If you want to set it from a specific breakpoint: (
      {breakpoints.map(([b, isLast]) => (
        <span key={b}>
          <code>{b}</code>
          {isLast ? ', ' : ''}
        </span>
      ))}
      ): <code>{props.display}</code>
    </>
  );
}

export function FlexValuesBlock(props: { name: string; values: string[] }) {
  return (
    <>
      The available values for {props.name} are the following:{' '}
      {props.values.map((val, i) => (
        <span key={val}>
          <code>{val}</code>
          {i < props.values.length - 1 ? ', ' : ''}
        </span>
      ))}
      .
    </>
  );
}

export function FlexDirectionContainer(props: { name: string }) {
  return (
    <FlexDocContainer name={props.name} prefix="flex">
      <div className={`d-flex flex-${props.name}`}>
        <div className="bg-yellow p-12">First content</div>
        <div className="bg-gray p-12">Second content</div>
      </div>
    </FlexDocContainer>
  );
}

export function AlignItemsContainer(props: { name: string }) {
  return (
    <FlexDocContainer name={props.name} prefix="align-items">
      <div className={`d-flex align-items-${props.name}`}>
        <div className="bg-yellow p-12">Content</div>
        <div className="bg-gray px-12 py-48">Content</div>
      </div>
    </FlexDocContainer>
  );
}

export function JustifyContentContainer(props: { name: string }) {
  return (
    <FlexDocContainer name={props.name} prefix="justify-content">
      <div className={`d-flex justify-content-${props.name}`}>
        <div className="bg-yellow p-12">Content</div>
        <div className="bg-gray p-12">Content</div>
      </div>
    </FlexDocContainer>
  );
}

export function AlignSelfContainer(props: { name: string }) {
  return (
    <FlexDocContainer name={props.name} prefix="align-self">
      <div className="d-flex align-items-start">
        <div className="bg-gray px-12 py-48">Content</div>
        <div className={`bg-yellow p-12 align-self-${props.name}`}>Content with align-self</div>
        <div className="bg-gray px-12 py-48">Content</div>
      </div>
    </FlexDocContainer>
  );
}

export function GrowContainer(props: { name: number }) {
  return (
    <FlexDocContainer name={props.name.toString()} prefix="flex-grow">
      <div className="d-flex align-items-start grow-shrink-container">
        <div className={`bg-yellow p-12 flex-grow-${props.name}`}>
          I'm {props.name === 0 ? 'not' : ''} growing
        </div>
        <div className="bg-gray p-12">Content</div>
      </div>
    </FlexDocContainer>
  );
}

export function ShrinkContainer(props: { name: number }) {
  return (
    <FlexDocContainer name={props.name.toString()} prefix="flex-shrink">
      <div className="d-flex align-items-start grow-shrink-container">
        <div className="bg-gray p-12">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </div>
        <div className={`bg-yellow p-12 flex-shrink-${props.name}`}>
          I {props.name === 0 ? "don't" : ''} shrink
        </div>
      </div>
    </FlexDocContainer>
  );
}

export function AlignContentContainer(props: { name: string }) {
  return (
    <FlexDocContainer name={props.name} prefix="align-content">
      <div className={`align-content-container d-flex align-content-${props.name} flex-wrap`}>
        <div className="bg-gray p-12">Content</div>
        <div className="bg-yellow p-12">Content</div>
        <div className="bg-gray p-12">Content</div>
        <div className="bg-yellow p-12">Content</div>
        <div className="bg-gray p-12">Content</div>
        <div className="bg-yellow p-12">Content</div>
        <div className="bg-gray p-12">Content</div>
        <div className="bg-yellow p-12">Content</div>
      </div>
    </FlexDocContainer>
  );
}

export function WrapContainer(props: { name: string }) {
  return (
    <FlexDocContainer name={props.name} prefix="flex">
      <div className={`d-flex flex-${props.name}`}>
        <div className="bg-gray p-12">Content</div>
        <div className="bg-yellow p-12">Content</div>
        <div className="bg-gray p-12">Content</div>
        <div className="bg-yellow p-12">Content</div>
        <div className="bg-gray p-12">Content</div>
        <div className="bg-yellow p-12">Content</div>
        <div className="bg-gray p-12">Content</div>
        <div className="bg-yellow p-12">Content</div>
      </div>
    </FlexDocContainer>
  );
}
