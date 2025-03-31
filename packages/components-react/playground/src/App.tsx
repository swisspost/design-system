import React from 'react';
import {
  PostAccordion,
  PostAccordionItem,
  PostIcon,
  PostPopover
} from '@swisspost/design-system-components-react';

const App = () => {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Swiss Post React Components</h1>
      <PostAccordion multiple headingLevel={2}>
        <PostAccordionItem>
          <span slot="header">Is this live?</span>
          <p>Yes, it is!</p>
        </PostAccordionItem>
        <PostAccordionItem>
          <span slot="header">Do components work?</span>
          <p>React versions of web components do render!</p>
        </PostAccordionItem>
      </PostAccordion>

      <PostIcon name="3020" />
      <div>
        <button data-popover-target="popover-one">
          Click here to see a popover
        </button>
      </div>
      <PostPopover class="palette-accent" id="popover-one" placement="top" arrow="">
        <h2>Optional title</h2>
        <p>
          A longer message that needs more time to read. <a href="#">Links</a> are also possible.
        </p>
      </PostPopover>
      </div>
  );
};

export default App;
