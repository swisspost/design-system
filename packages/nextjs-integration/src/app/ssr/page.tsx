import { PostAccordion, PostAccordionItem, PostClosebutton } from '@swisspost/design-system-components-react/server';
import { PostIconExplosives, PostIconLetter, PostIconLetterSolid } from '@swisspost/design-system-components-react/icons';

export default function Page() {
  return (
    <>
     <h1>Design System Components</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea debitis ex rem minus! Ut
        mollitia deserunt iure impedit. Enim, officia. Fugiat, cupiditate repellat? Excepturi est
        iusto suscipit, omnis iste laboriosam!
      </p>
  <h4>.mockElement</h4>
  <div className="mock-element">
    <PostClosebutton>
      Close
    </PostClosebutton>
  </div>

  <h4>Accordion</h4>
  <PostAccordion headingLevel={3}>
    <PostAccordionItem>
    <span slot="header">Title 1</span>
    <p>
      Example content for accordion item 1. This is a sample text demonstrating how the
      accordion component works.
    </p>
    </PostAccordionItem>
    <PostAccordionItem>
    <span slot="header">Title 2</span>
    <p>
      Example content for accordion item 2. This is a sample text demonstrating how the
      accordion component works.
    </p>
    </PostAccordionItem>
    <PostAccordionItem>
    <span slot="header">Title 3</span>
    <p>
      Example content for accordion item 3. This is a sample text demonstrating how the
      accordion component works.
    </p>
    </PostAccordionItem>
    </PostAccordion>

  <div className="d-flex gap-16 flex-wrap">
        <figure>
          <PostIconLetter className="fs-2"></PostIconLetter>
          <figcaption>Line Icon</figcaption>
        </figure>
        <figure>
          <PostIconLetterSolid className="fs-2"></PostIconLetterSolid>
          <figcaption>Solid Icon</figcaption>
        </figure>
        <figure>
          <PostIconLetter style={{ color: 'red' }} className="fs-2"></PostIconLetter>
          <figcaption>Colored Icon</figcaption>
        </figure>
        <figure>
          <PostIconLetter className="fs-3"></PostIconLetter>
          <figcaption>Sized Icon</figcaption>
        </figure>
        <figure>
          <PostIconExplosives flipH={true} className="fs-2"></PostIconExplosives>
          <figcaption>Flipped Horizontally</figcaption>
        </figure>
        <figure>
          <PostIconExplosives className="fs-2" flipV={true}></PostIconExplosives>
          <figcaption>Flipped Vertically</figcaption>
        </figure>
        <figure>
          <PostIconLetter className="fs-2" rotate={90}></PostIconLetter>
          <figcaption>Rotated</figcaption>
        </figure>
        <figure>
          <PostIconLetter className="fs-2" scale={1.5}></PostIconLetter>
          <figcaption>Scaled</figcaption>
        </figure>
        <figure>
          <PostIconLetter className="fs-2" animation={'spin'}></PostIconLetter>
          <figcaption>Spinning</figcaption>
        </figure>
      </div>
    </>
  );
}
