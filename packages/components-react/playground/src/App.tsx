import {
  PostAccordion,
  PostAccordionItem,
  PostIcon,
  PostPopover
} from '@swisspost/design-system-components-react';

const App = () => {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>React Components</h1>
      <PostAccordion headingLevel={3}>
        <PostAccordionItem>
          <span slot="header">Titulum 1</span>
          <div>
            <p>Contentus momentus vero siteos et accusam iretea et justo.</p>
          </div>
        </PostAccordionItem>

        <PostAccordionItem>
          <span slot="header">Titulum 2</span>
          <div>
            <p>Contentus momentus vero siteos et accusam iretea et justo.</p>
          </div>
        </PostAccordionItem>

        <PostAccordionItem>
          <span slot="header">Titulum 3</span>
          <div>
            <p>Contentus momentus vero siteos et accusam iretea et justo.</p>
          </div>
        </PostAccordionItem>
      </PostAccordion>

      <PostIcon name="3020" />
      <div className="d-flex justify-content-center">
        <button className="btn btn-secondary btn-large" data-popover-target="popover-one">
          Click here to see a popover
        </button>
      </div>
      <PostPopover class="palette-accent" id="popover-one" placement="top" arrow="">
        <h2 className="h6">Optional title</h2>
        <p className="mb-0">
          A longer message that needs more time to read. <a href="#">Links</a> are also possible.
        </p>
      </PostPopover>
      </div>
  );
};

export default App;
