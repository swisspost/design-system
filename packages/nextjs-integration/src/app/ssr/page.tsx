import { PostAccordion, PostAccordionItem, PostAvatar, PostBanner, PostStepper, PostStepperItem } from '@swisspost/design-system-components-react/server';
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
  <h2>Stepper</h2>
  <PostStepper textCompletedStep="Completed step" text-current-step="Current step" text-step-number="Step #number:" current-index="2" selected-index="">
       <PostStepperItem> Step 1 label</PostStepperItem>  <PostStepperItem> Step 2 label</PostStepperItem>  <PostStepperItem> Step 3 label</PostStepperItem>  <PostStepperItem> Step 4 label</PostStepperItem>  <PostStepperItem> Step 5 label</PostStepperItem> 
    </PostStepper>

  <h2>Accordion</h2>
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

  <h2>Avatar</h2>
  <PostAvatar firstname="Firstname" description="The current user is Firstname." />

  <h2>Banner</h2>
  <PostBanner>
      <p>This is the content of the banner. It helps to draw attention to critical messages.</p>
    </PostBanner>
      <h2>React Server Icons</h2>
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
