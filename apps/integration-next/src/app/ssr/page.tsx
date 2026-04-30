import { PostAccordion, PostAccordionItem, PostAutocomplete, PostAvatar, PostBanner, PostClosebutton, PostCollapsible, PostCollapsibleTrigger, PostDatePicker, PostIcon, PostLinkarea, PostListbox, PostListboxOption, PostMenu, PostMenuItem, PostMenuTrigger, PostNumberInput, PostPagination, PostPopover, PostPopoverTrigger, PostRating, PostStepper, PostStepperItem, PostTabItem, PostTabPanel, PostTabs, PostTogglebutton, PostTooltip, PostTooltipTrigger } from '@swisspost/design-system-components-react/server';
import { PostIconExplosives, PostIconLetter, PostIconLetterSolid } from '@swisspost/design-system-components-react/icons';

export default function Home() {
  return (
    <>
      <h1>Design System Components</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea debitis ex rem minus! Ut
        mollitia deserunt iure impedit. Enim, officia. Fugiat, cupiditate repellat? Excepturi est
        iusto suscipit, omnis iste laboriosam!
      </p>
  <h2>Accordion</h2>
  <h3>default</h3>
  <PostAccordion headingLevel={3}>
    <PostAccordionItem >
    <span slot="header">Title 1</span>
    <p>
      Example content for accordion item 1. This is a sample text demonstrating how the
      accordion component works.
    </p>
    </PostAccordionItem>
    <PostAccordionItem >
    <span slot="header">Title 2</span>
    <p>
      Example content for accordion item 2. This is a sample text demonstrating how the
      accordion component works.
    </p>
    </PostAccordionItem>
    <PostAccordionItem >
    <span slot="header">Title 3</span>
    <p>
      Example content for accordion item 3. This is a sample text demonstrating how the
      accordion component works.
    </p>
    </PostAccordionItem>
    </PostAccordion>

  <h3>logos</h3>
  <PostAccordion headingLevel={4}>
    <PostAccordionItem ><img slot="logo" alt="logo" src="/assets/images/logo-swisspost.svg" />
    <span slot="header">Title 1</span>
    <p>
      Example content for accordion item 1. This is a sample text demonstrating how the
      accordion component works.
    </p>
    </PostAccordionItem>
    <PostAccordionItem ><img slot="logo" alt="logo" src="/assets/images/logo-swisspost.svg" />
    <span slot="header">Title 2</span>
    <p>
      Example content for accordion item 2. This is a sample text demonstrating how the
      accordion component works.
    </p>
    </PostAccordionItem>
    <PostAccordionItem ><img slot="logo" alt="logo" src="/assets/images/logo-swisspost.svg" />
    <span slot="header">Title 3</span>
    <p>
      Example content for accordion item 3. This is a sample text demonstrating how the
      accordion component works.
    </p>
    </PostAccordionItem>
    </PostAccordion>

  <h3>multiple-open-panels</h3>
  <PostAccordion headingLevel={4} multiple={true}>
    <PostAccordionItem >
    <span slot="header">Title 1</span>
    <p>
      Example content for accordion item 1. This is a sample text demonstrating how the
      accordion component works.
    </p>
    </PostAccordionItem>
    <PostAccordionItem collapsed={false}>
    <span slot="header">Title 2</span>
    <p>
      Example content for accordion item 2. This is a sample text demonstrating how the
      accordion component works.
    </p>
    </PostAccordionItem>
    <PostAccordionItem collapsed={false}>
    <span slot="header">Title 3</span>
    <p>
      Example content for accordion item 3. This is a sample text demonstrating how the
      accordion component works.
    </p>
    </PostAccordionItem>
    </PostAccordion>

  <h3>default-collapsed-panels</h3>
  <PostAccordion headingLevel={4}>
      <PostAccordionItem collapsed={true}>
    <span slot="header">Title 1</span>
    <p>
      Example content for accordion item 1. This is a sample text demonstrating how the
      accordion component works.
    </p>
      </PostAccordionItem>
      <PostAccordionItem >
    <span slot="header">Title 2</span>
    <p>
      Example content for accordion item 2. This is a sample text demonstrating how the
      accordion component works.
    </p>
      </PostAccordionItem>
      <PostAccordionItem collapsed={true}>
    <span slot="header">Title 3</span>
    <p>
      Example content for accordion item 3. This is a sample text demonstrating how the
      accordion component works.
    </p>
      </PostAccordionItem>
    </PostAccordion>

  <h3>nested</h3>
  <PostAccordion headingLevel={4}>
      <PostAccordionItem >
    <span slot="header">Title 1 <code>h4</code></span>
    <p>
      Example content for accordion item 1. This is a sample text demonstrating how the
      accordion component works.
    </p>
    <PostAccordion headingLevel={5}>
          <PostAccordionItem >
    <span slot="header">Title 1.1 <code>h5</code></span>
    <p>
      Example content for accordion item 1.1. This is a sample text demonstrating how the
      accordion component works.
    </p>
          </PostAccordionItem>
          <PostAccordionItem >
    <span slot="header">Title 1.2 <code>h5</code></span>
    <p>
      Example content for accordion item 1.2. This is a sample text demonstrating how the
      accordion component works.
    </p>
          </PostAccordionItem>
          <PostAccordionItem >
    <span slot="header">Title 1.3 <code>h5</code></span>
    <p>
      Example content for accordion item 1.3. This is a sample text demonstrating how the
      accordion component works.
    </p>
          </PostAccordionItem>
    </PostAccordion>
        <div></div>
      </PostAccordionItem>
      <PostAccordionItem >
    <span slot="header">Title 2 <code>h4</code></span>
    <p>
      Example content for accordion item 2. This is a sample text demonstrating how the
      accordion component works.
    </p>
        <div>
    <PostAccordion headingLevel={5}>
          <PostAccordionItem >
    <span slot="header">Title 2.1 <code>h5</code></span>
    <p>
      Example content for accordion item 2.1. This is a sample text demonstrating how the
      accordion component works.
    </p>
          </PostAccordionItem>
          <PostAccordionItem >
    <span slot="header">Title 2.2 <code>h5</code></span>
    <p>
      Example content for accordion item 2.2. This is a sample text demonstrating how the
      accordion component works.
    </p>
          </PostAccordionItem>
          <PostAccordionItem >
    <span slot="header">Title 2.3 <code>h5</code></span>
    <p>
      Example content for accordion item 2.3. This is a sample text demonstrating how the
      accordion component works.
    </p>
          </PostAccordionItem>
    </PostAccordion>
  </div>
      </PostAccordionItem>
      <PostAccordionItem >
    <span slot="header">Title 3 <code>h4</code></span>
    <p>
      Example content for accordion item 3. This is a sample text demonstrating how the
      accordion component works.
    </p>
        <div></div>
      </PostAccordionItem>
    </PostAccordion>

  <h2>Autocomplete</h2>
  <h3>default</h3>
  <PostAutocomplete filterThreshold={0}>
        <div className="form-floating">
          <input className="form-control" type="text" placeholder="Select Country" id="5ef3cb45-86f6-4baf-bdbf-35bd2ddf0f3d--default-input" />
          <label className="form-label" htmlFor="5ef3cb45-86f6-4baf-bdbf-35bd2ddf0f3d--default-input">Country</label>
        </div>
        <PostListbox >
    <div slot="blank-slate">Nothing to see here</div>
    <PostListboxOption value="Switzerland" />
    <PostListboxOption value="Germany" />
    <PostListboxOption value="France" />
    <PostListboxOption value="Italy" />
    <PostListboxOption value="Austria" />
    <PostListboxOption value="Spain" />
    <PostListboxOption value="Portugal" />
    <PostListboxOption value="Netherlands" />
    <PostListboxOption value="Belgium" />
    <PostListboxOption value="Sweden" />
  </PostListbox>
      </PostAutocomplete>

  <h3>clearable</h3>
  <PostAutocomplete clearable={false} filterThreshold={0}>
        <div className="form-floating">
          <input className="form-control" type="text" placeholder="Select Country" id="5ef3cb45-86f6-4baf-bdbf-35bd2ddf0f3d--clearable-input" />
          <label className="form-label" htmlFor="5ef3cb45-86f6-4baf-bdbf-35bd2ddf0f3d--clearable-input">Country</label>
        </div>
        <PostListbox >
    <div slot="blank-slate">Nothing to see here</div>
    <PostListboxOption value="Switzerland" />
    <PostListboxOption value="Germany" />
    <PostListboxOption value="France" />
    <PostListboxOption value="Italy" />
    <PostListboxOption value="Austria" />
    <PostListboxOption value="Spain" />
    <PostListboxOption value="Portugal" />
    <PostListboxOption value="Netherlands" />
    <PostListboxOption value="Belgium" />
    <PostListboxOption value="Sweden" />
  </PostListbox>
      </PostAutocomplete>

  <h3>detached-listbox</h3>
  <PostAutocomplete filterThreshold={0} listbox="5ef3cb45-86f6-4baf-bdbf-35bd2ddf0f3d--detached-listbox-listbox">
        <div className="form-floating">
          <input className="form-control" type="text" placeholder="Select Country" id="5ef3cb45-86f6-4baf-bdbf-35bd2ddf0f3d--detached-listbox-input" />
          <label className="form-label" htmlFor="5ef3cb45-86f6-4baf-bdbf-35bd2ddf0f3d--detached-listbox-input">Country</label>
        </div>
      </PostAutocomplete>

  <h3>filter-threshold</h3>
  <PostAutocomplete filterThreshold={3}>
        <div className="form-floating">
          <input className="form-control" type="text" placeholder="Select Country" id="5ef3cb45-86f6-4baf-bdbf-35bd2ddf0f3d--filter-threshold-input" />
          <label className="form-label" htmlFor="5ef3cb45-86f6-4baf-bdbf-35bd2ddf0f3d--filter-threshold-input">Country</label>
        </div>
        <PostListbox >
    <div slot="blank-slate">Nothing to see here</div>
    <PostListboxOption value="Switzerland" />
    <PostListboxOption value="Germany" />
    <PostListboxOption value="France" />
    <PostListboxOption value="Italy" />
    <PostListboxOption value="Austria" />
    <PostListboxOption value="Spain" />
    <PostListboxOption value="Portugal" />
    <PostListboxOption value="Netherlands" />
    <PostListboxOption value="Belgium" />
    <PostListboxOption value="Sweden" />
  </PostListbox>
      </PostAutocomplete>

  <h3>option-description</h3>
  <PostAutocomplete filterThreshold={0}>
        <div className="form-floating">
          <input className="form-control" type="text" placeholder="Select Country" id="5ef3cb45-86f6-4baf-bdbf-35bd2ddf0f3d--option-description-input" />
          <label className="form-label" htmlFor="5ef3cb45-86f6-4baf-bdbf-35bd2ddf0f3d--option-description-input">Country</label>
        </div>
        <PostListbox >
    <div slot="blank-slate">Nothing to see here</div>
    <PostListboxOption value="Switzerland">Alpine Region</PostListboxOption>
    <PostListboxOption value="Germany">Central Europe</PostListboxOption>
    <PostListboxOption value="France">Western Europe</PostListboxOption>
    <PostListboxOption value="Italy">Southern Europe</PostListboxOption>
    <PostListboxOption value="Austria">Alpine Region</PostListboxOption>
    <PostListboxOption value="Spain">Iberian Peninsula</PostListboxOption>
    <PostListboxOption value="Portugal">Iberian Peninsula</PostListboxOption>
    <PostListboxOption value="Netherlands">Benelux</PostListboxOption>
    <PostListboxOption value="Belgium">Benelux</PostListboxOption>
    <PostListboxOption value="Sweden">Scandinavia</PostListboxOption>
  </PostListbox>
      </PostAutocomplete>

  <h2>Avatar</h2>
  <h3>default</h3>
  <PostAvatar firstname="Firstname" description="The current user is Firstname." />

  <h3>anchor-wrapped</h3>
  <PostAvatar firstname="Firstname" description="The current user is Firstname." />

  <h3>button-wrapped</h3>
  <PostAvatar firstname="Firstname" description="The current user is Firstname." />

  <h2>Banner</h2>
  <h3>default</h3>
  <PostBanner >
      <p>This is the content of the banner. It helps to draw attention to critical messages.</p>
    </PostBanner>

  <h3>contents</h3>
  <PostBanner >
      <h4 slot="heading">Heading Title</h4><ul className="list-unstyled"><li className="d-flex gap-8"><PostIcon name="moon" />An example list item</li><li className="d-flex gap-8"><PostIcon name="sun" />Another example list item</li></ul><hr className="w-full" /><p>This is the banner content that provides important information to the user.</p><button slot="actions" className="btn btn-secondary"><span>Cancel</span></button><button slot="actions" className="btn btn-primary"><span>Accept</span></button>
    </PostBanner>

  <h3>dismissible</h3>
  <PostBanner >
       <PostClosebutton slot="close-button"> Close </PostClosebutton> 
      <p>This is the content of the banner. It helps to draw attention to critical messages.</p>
    </PostBanner>

  <h2>Closebutton</h2>
  <h3>default</h3>
  <PostClosebutton >
      Close
    </PostClosebutton>

  <h3>automatic-positioning</h3>
  <PostClosebutton >
      Close
    </PostClosebutton>

  <h2>Collapsible</h2>
  <h3>default</h3>
  <PostCollapsibleTrigger for="6a91848c-16ec-4a23-bc45-51c797b5b2c3--default">
      <button className="btn btn-secondary">Toggle Collapsible</button>
    </PostCollapsibleTrigger>

  <h3>initially-collapsed</h3>
  <PostCollapsibleTrigger for="6a91848c-16ec-4a23-bc45-51c797b5b2c3--initially-collapsed">
      <button className="btn btn-secondary">Toggle Collapsible</button>
    </PostCollapsibleTrigger>

  <h3>default</h3>
  <PostCollapsible id="6a91848c-16ec-4a23-bc45-51c797b5b2c3--default" data-version="10.0.0-next.67" data-hydrated="">
      <p className="border rounded p-24">This is collapsible content that can be shown or hidden.</p>
    </PostCollapsible>

  <h3>initially-collapsed</h3>
  <PostCollapsible id="6a91848c-16ec-4a23-bc45-51c797b5b2c3--initially-collapsed" collapsed="" data-version="10.0.0-next.67" tabindex="-1" data-hydrated="" style={{ height: '0px', overflow: 'hidden' }}>
      <p className="border rounded p-24">This is collapsible content that can be shown or hidden.</p>
    </PostCollapsible>

  <h2>DatePicker</h2>
  <h3>default</h3>
  <PostDatePicker textToggleCalendar="Open calendar" textNextDecade="Next decade" textNextMonth="Next month" textNextYear="Next year" textPreviousDecade="Previous decade" textPreviousMonth="Previous month" textPreviousYear="Previous year" textSwitchYear="Switch to year view" id="main">
      <input className="form-control" type="text" />
      <p className="form-hint">Format: DD.MM.YYYY</p>
    </PostDatePicker>

  <h3>inline</h3>
  <PostDatePicker inline={false} textToggleCalendar="Open calendar" textNextDecade="Next decade" textNextMonth="Next month" textNextYear="Next year" textPreviousDecade="Previous decade" textPreviousMonth="Previous month" textPreviousYear="Previous year" textSwitchYear="Switch to year view" id="inline"> </PostDatePicker>

  <h3>inline-range</h3>
  <PostDatePicker inline={false} range={false} textToggleCalendar="Open calendar" textNextDecade="Next decade" textNextMonth="Next month" textNextYear="Next year" textPreviousDecade="Previous decade" textPreviousMonth="Previous month" textPreviousYear="Previous year" textSwitchYear="Switch to year view" id="inline-range"> </PostDatePicker>

  <h3>range</h3>
  <PostDatePicker range={false} textToggleCalendar="Open calendar" textNextDecade="Next decade" textNextMonth="Next month" textNextYear="Next year" textPreviousDecade="Previous decade" textPreviousMonth="Previous month" textPreviousYear="Previous year" textSwitchYear="Switch to year view" id="range">
      <input className="form-control" type="text" />
      <p className="form-hint">Format: DD.MM.YYYY - DD.MM.YYYY</p>
    </PostDatePicker>

  <h3>disabled-dates</h3>
  <PostDatePicker inline={false} textToggleCalendar="Open calendar" textNextDecade="Next decade" textNextMonth="Next month" textNextYear="Next year" textPreviousDecade="Previous decade" textPreviousMonth="Previous month" textPreviousYear="Previous year" textSwitchYear="Switch to year view" id="disabled-dates"> </PostDatePicker>

  <h2>Icon</h2>
  <h3>default</h3>
  <PostIcon name="stampapostplus" />

  <h3>ui</h3>
  <PostIcon name="accessibility" />

  <h3>color</h3>
  <PostIcon name="stampapostplus" style={{ color: 'blue' }}></PostIcon>

  <h3>size</h3>
  <PostIcon name="stampapostplus" style={{ fontSize: '1rem' }}></PostIcon>

  <h3>flip</h3>
  <PostIcon name="stampapostplus" />

  <h3>scale</h3>
  <PostIcon name="stampapostplus" scale="0.5" />

  <h3>rotate</h3>
  <PostIcon name="stampapostplus" rotate="-365" />

  <h3>animate</h3>
  <PostIcon name="dragleftright" animation="cylon" />

  <h2>Linkarea</h2>
  <PostLinkarea className="palette palette-alternate p-32 rounded-8">
      <h5>My clickable element</h5>
      <p>
        Clicking anywhere within this <code>post-linkarea</code> will click on the link that is
        placed within the component.
      </p>
      <a target="_blank" href="https://post.ch">Link text</a>
    </PostLinkarea>

  <h2>Menu</h2>
  <h3>default</h3>
  <PostMenuTrigger for="menu--default">  <button className="btn btn-secondary">Open Menu</button>  </PostMenuTrigger>

  <h3>right</h3>
  <PostMenuTrigger for="menu--right">  <button className="btn btn-secondary">Menu on the right</button>  </PostMenuTrigger>

  <h3>icon-trigger</h3>
  <PostMenuTrigger for="menu--icon-trigger"> 
      <button className="btn btn-tertiary btn-lg btn-icon">
        <PostIcon aria-hidden="true" name="home" />
        <span className="visually-hidden">Open home menu</span>
      </button>
     </PostMenuTrigger>

  <h3>mixed-content</h3>
  <PostMenuTrigger for="menu--mixed-content">  <button className="btn btn-secondary">Mixed content</button>  </PostMenuTrigger>

  <h3>with-icons</h3>
  <PostMenuTrigger for="menu--with-icons">  <button className="btn btn-secondary">Icons in front</button>  </PostMenuTrigger>

  <h3>default</h3>
  <PostMenu id="menu--default" label="Menu description" data-version="10.0.0-next.67">
      <PostMenuItem data-version="10.0.0-next.67" data-hydrated=""><a href="/first">First menu item</a></PostMenuItem>
      <PostMenuItem data-version="10.0.0-next.67" data-hydrated=""><a href="/second">Second menu item</a></PostMenuItem>
      <PostMenuItem data-version="10.0.0-next.67" data-hydrated=""><a href="/third">Third menu item</a></PostMenuItem>
      </PostMenu>

  <h3>right</h3>
  <PostMenu id="menu--right" placement="right" label="Menu description" data-version="10.0.0-next.67" data-hydrated="">
      <PostMenuItem data-version="10.0.0-next.67" data-hydrated=""><a href="/first">First menu item</a></PostMenuItem>
      <PostMenuItem data-version="10.0.0-next.67" data-hydrated=""><a href="/second">Second menu item</a></PostMenuItem>
      <PostMenuItem data-version="10.0.0-next.67" data-hydrated=""><a href="/third">Third menu item</a></PostMenuItem>
      </PostMenu>

  <h3>icon-trigger</h3>
  <PostMenu id="menu--icon-trigger" label="Menu description" data-version="10.0.0-next.67">
      <PostMenuItem data-version="10.0.0-next.67" data-hydrated=""><a href="/first">First menu item</a></PostMenuItem>
      <PostMenuItem data-version="10.0.0-next.67" data-hydrated=""><a href="/second">Second menu item</a></PostMenuItem>
      <PostMenuItem data-version="10.0.0-next.67" data-hydrated=""><a href="/third">Third menu item</a></PostMenuItem>
      </PostMenu>

  <h3>mixed-content</h3>
  <PostMenu id="menu--mixed-content" label="Menu description" data-version="10.0.0-next.67" data-hydrated="">
      <PostMenuItem data-version="10.0.0-next.67" data-hydrated="">
        <a href="/details">View details <em className="fs-7">link</em></a>
      </PostMenuItem>
      <PostMenuItem data-version="10.0.0-next.67" data-hydrated="">
        <button type="button">Duplicate <em className="fs-7">button</em></button>
      </PostMenuItem>
      <PostMenuItem data-version="10.0.0-next.67" data-hydrated="">
        <button type="button">Delete <em className="fs-7">button</em></button>
      </PostMenuItem>
      </PostMenu>

  <h3>with-icons</h3>
  <PostMenu id="menu--with-icons" label="Menu description" data-version="10.0.0-next.67">
      <PostMenuItem data-version="10.0.0-next.67" data-hydrated="">
        <button type="button"><PostIcon aria-hidden="true" name="edit" data-version="10.0.0-next.67" data-hydrated="" /> Edit</button>
      </PostMenuItem>
      <PostMenuItem data-version="10.0.0-next.67" data-hydrated="">
        <button type="button"><PostIcon aria-hidden="true" name="copy" data-version="10.0.0-next.67" data-hydrated="" /> Copy</button>
      </PostMenuItem>
      <PostMenuItem data-version="10.0.0-next.67" data-hydrated="">
        <button type="button">
          <PostIcon aria-hidden="true" name="trash" data-version="10.0.0-next.67" data-hydrated="" /> Delete
        </button>
      </PostMenuItem>
      </PostMenu>

  <h2>NumberInput</h2>
  <h3>default</h3>
  <PostNumberInput className="form-floating">
    <input type="number" id="number-input--default" className="form-control" placeholder="" aria-describedby="form-hint-d5f43fa8-42ba-4cb9-98c7-9386d4c939bb--default" />
   <label className="form-label" htmlFor="number-input--default">Quantity</label> 
      </PostNumberInput>

  <h3>floating-label</h3>
  <PostNumberInput className="form-floating">
    <input type="number" id="number-input--floating-label" className="form-control" placeholder="" />
   <label className="form-label" htmlFor="number-input--floating-label">Quantity</label> 
      </PostNumberInput>

  <h3>small</h3>
  <PostNumberInput >
    <input type="number" id="number-input--small" className="form-control form-control-sm" aria-describedby="form-hint-d5f43fa8-42ba-4cb9-98c7-9386d4c939bb--small" />
      </PostNumberInput>

  <h2>Pagination</h2>
  <h3>default</h3>
  <PostPagination page={1} pageSize={10} collectionSize={100} label="Pagination" textPrevious="Previous page" textNext="Next page" textPage="Page" textFirst="First page" textLast="Last page"></PostPagination>

  <h3>many-pages</h3>
  <PostPagination page={10} pageSize={6} collectionSize={200} label="Pagination" textPrevious="Previous page" textNext="Next page" textPage="Page" textFirst="First page" textLast="Last page"></PostPagination>

  <h3>page-out-of-range</h3>
  <PostPagination page={50} pageSize={10} collectionSize={40} label="Pagination" textPrevious="Previous page" textNext="Next page" textPage="Page" textFirst="First page" textLast="Last page"></PostPagination>

  <h2>Popover</h2>
  <h3>default</h3>
  <PostPopoverTrigger for="popover-one">
      <button className="btn btn-secondary">Popover Trigger</button>
    </PostPopoverTrigger>

  <h3>wrapped</h3>
  <PostPopoverTrigger >
        <button className="btn btn-secondary">Popover Trigger</button>
        <PostPopover className="palette palette-accent" placement="top" textClose="Close" arrow={false}>
          <h2 className="h6">Optional title</h2>
          <p className="mb-0">
            A longer message that needs more time to read. <a href="#">Links</a> are also possible.
          </p>
        </PostPopover>
      </PostPopoverTrigger>

  <h3>info-icon</h3>
  <PostPopoverTrigger >
        <button className="btn btn-link btn-icon">
          <PostIcon aria-hidden="true" name="info" />
          <span className="visually-hidden">See more information</span>
        </button>
        <PostPopover className="palette palette-accent" placement="top" textClose="Close" arrow={false}>
          <p className="mb-0">
            Follow your letter's journey with automatic updates at key delivery milestones.
          </p>
        </PostPopover>
      </PostPopoverTrigger>

  <h3>default</h3>
  <PostPopover className="palette palette-accent" id="popover-one" placement="top" textClose="Close" arrow={false} data-version="10.0.0-next.67">
       <h2 className="h6">Optional title</h2> 
      <p className="mb-0">A longer message that needs more time to read. <a href="#">Links</a> are also possible.</p>
    </PostPopover>

  <h3>wrapped</h3>
  <PostPopover className="palette palette-accent" placement="top" textClose="Close" arrow={false} data-version="10.0.0-next.67">
          <h2 className="h6">Optional title</h2>
          <p className="mb-0">
            A longer message that needs more time to read. <a href="#">Links</a> are also possible.
          </p>
        </PostPopover>

  <h3>info-icon</h3>
  <PostPopover className="palette palette-accent" placement="top" textClose="Close" arrow={false}>
          <p className="mb-0">
            Follow your letter's journey with automatic updates at key delivery milestones.
          </p>
        </PostPopover>

  <h2>Rating</h2>
  <h3>default</h3>
  <PostRating label="Rating" />

  <h3>readonly</h3>
  <PostRating label="Rating" currentRating={3} readonly={true}></PostRating>

  <h2>Stepper</h2>
  <h3>default</h3>
  <PostStepper textCompletedStep="Completed step" textCurrentStep="Current step" textStepNumber="Step #number:" currentIndex={2}>
       <PostStepperItem > Step 1 label</PostStepperItem>  <PostStepperItem > Step 2 label</PostStepperItem>  <PostStepperItem > Step 3 label</PostStepperItem>  <PostStepperItem > Step 4 label</PostStepperItem>  <PostStepperItem > Step 5 label</PostStepperItem> 
    </PostStepper>

  <h3>selected</h3>
  <PostStepper textCompletedStep="Completed step" textCurrentStep="Current step" textStepNumber="Step #number:" currentIndex={3}>
       <PostStepperItem > Step 1 label</PostStepperItem>  <PostStepperItem > Step 2 label</PostStepperItem>  <PostStepperItem > Step 3 label</PostStepperItem>  <PostStepperItem > Step 4 label</PostStepperItem>  <PostStepperItem > Step 5 label</PostStepperItem> 
    </PostStepper>

  <h2>Tabs</h2>
  <h3>default</h3>
  <PostTabs >
      <PostTabItem name="first">First tab</PostTabItem>
      <PostTabItem name="second">Second tab</PostTabItem>
      <PostTabItem name="third">Third tab</PostTabItem>
      <PostTabPanel for="first">
        This is the content of the first tab. By default it is shown initially.
      </PostTabPanel>
      <PostTabPanel for="second">
        This is the content of the second tab. By default it is hidden initially.
      </PostTabPanel>
      <PostTabPanel for="third">
        This is the content of the third tab. By default it is also hidden initially.
      </PostTabPanel>
    </PostTabs>

  <h3>panels-variant</h3>
  <PostTabs >
      <PostTabItem name="first">First tab</PostTabItem>
      <PostTabItem name="second">Second tab</PostTabItem>
      <PostTabItem name="third">Third tab</PostTabItem>
      <PostTabPanel for="first">
        This is the content of the first tab. By default it is shown initially.
      </PostTabPanel>
      <PostTabPanel for="second">
        This is the content of the second tab. By default it is hidden initially.
      </PostTabPanel>
      <PostTabPanel for="third">
        This is the content of the third tab. By default it is also hidden initially.
      </PostTabPanel>
    </PostTabs>

  <h3>active-tab</h3>
  <PostTabs activeTab="second">
      <PostTabItem name="first">First tab</PostTabItem>
      <PostTabItem name="second">Second tab</PostTabItem>
      <PostTabItem name="third">Third tab</PostTabItem>
      <PostTabPanel for="first">
        This is the content of the first tab. By default it is shown initially.
      </PostTabPanel>
      <PostTabPanel for="second">
        This is the content of the second tab. By default it is hidden initially.
      </PostTabPanel>
      <PostTabPanel for="third">
        This is the content of the third tab. By default it is also hidden initially.
      </PostTabPanel>
    </PostTabs>

  <h3>full-width</h3>
  <PostTabs fullWidth={true}>
      <PostTabItem name="first">First tab</PostTabItem>
      <PostTabItem name="second">Second tab</PostTabItem>
      <PostTabItem name="third">Third tab</PostTabItem>
      <PostTabPanel for="first">
        This is the content of the first tab. By default it is shown initially.
      </PostTabPanel>
      <PostTabPanel for="second">
        This is the content of the second tab. By default it is hidden initially.
      </PostTabPanel>
      <PostTabPanel for="third">
        This is the content of the third tab. By default it is also hidden initially.
      </PostTabPanel>
    </PostTabs>

  <h3>navigation-full-width</h3>
  <PostTabs fullWidth={true} label="Tabs navigation">
      <PostTabItem name="first">
        <a href="/first" aria-current="page">First page</a>
      </PostTabItem>
      <PostTabItem name="second">
        <a href="/second">Second page</a>
      </PostTabItem>
      <PostTabItem name="third">
        <a href="/third">Third page</a>
      </PostTabItem>
    </PostTabs>

  <h3>navigation-variant</h3>
  <PostTabs label="Tabs navigation">
      <PostTabItem name="first">
        <a href="/first" aria-current="page">First page</a>
      </PostTabItem>
      <PostTabItem name="second">
        <a href="/second">Second page</a>
      </PostTabItem>
      <PostTabItem name="third">
        <a href="/third">Third page</a>
      </PostTabItem>
    </PostTabs>

  <h3>active-navigation-item</h3>
  <PostTabs label="Tabs navigation">
      <PostTabItem name="letters">
        <a href="/letters">Letters</a>
      </PostTabItem>
      <PostTabItem name="packages">
        <a href="/packages" aria-current="page">Packages</a>
      </PostTabItem>
      <PostTabItem name="logistics">
        <a href="/logistics">Logistics</a>
      </PostTabItem>
      </PostTabs>

  <h2>Togglebutton</h2>
  <h3>default</h3>
  <PostTogglebutton className="btn btn-primary">
      <span data-showwhen="untoggled">Untoggled</span>
      <span data-showwhen="toggled">Toggled</span>
    </PostTogglebutton>

  <h3>initially-toggled</h3>
  <PostTogglebutton className="btn btn-primary" toggled={true}>
      <span data-showwhen="untoggled">Untoggled</span>
      <span data-showwhen="toggled">Toggled</span>
    </PostTogglebutton>

  <h3>content-visibility</h3>
  <PostTogglebutton className="btn btn-primary">
        Menu
        <span data-showwhen="untoggled"><PostIcon name="burger" /></span>
        <span data-showwhen="toggled"><PostIcon name="closex" /></span>
      </PostTogglebutton>

  <h2>Tooltip</h2>
  <h3>default</h3>
  <PostTooltipTrigger for="tooltip-one">
      <button className="btn btn-secondary btn-large">Button</button></PostTooltipTrigger>

  <h3>non-focusable</h3>
  <PostTooltipTrigger for="tooltip-non-focusable" delay={650}>
        <cite>This is a cite element with a tooltip on it.</cite>
      </PostTooltipTrigger>

  <h3>multiple</h3>
  <PostTooltipTrigger for="tooltip-multiple" delay={650}>
        <button className="btn btn-secondary btn-large">Tooltip button</button>
      </PostTooltipTrigger>

  <h3>default</h3>
  <PostTooltip id="tooltip-one" className="palette palette-accent" placement="top" data-version="10.0.0-next.67">
      Hi there 👋
    </PostTooltip>

  <h3>non-focusable</h3>
  <PostTooltip className="hydrated" id="tooltip-non-focusable" placement="top" data-version="10.0.0-next.67" data-hydrated="">
        This is not the link you are looking for
      </PostTooltip>

  <h3>multiple</h3>
  <PostTooltip id="tooltip-multiple" className="hydrated bg-" placement="top" data-version="10.0.0-next.67">
        I'm the same, no matter what
      </PostTooltip>
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
