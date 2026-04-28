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

  <h2>Autocomplete</h2>
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

  <h2>Avatar</h2>
  <PostAvatar firstname="Firstname" description="The current user is Firstname." />

  <h2>Banner</h2>
  <PostBanner >
      <p>This is the content of the banner. It helps to draw attention to critical messages.</p>
    </PostBanner>

  <h2>Closebutton</h2>
  <PostClosebutton >
      Close
    </PostClosebutton>

  <h2>Collapsible</h2>
  <PostCollapsibleTrigger for="6a91848c-16ec-4a23-bc45-51c797b5b2c3--default">
      <button className="btn btn-secondary">Toggle Collapsible</button>
    </PostCollapsibleTrigger>

  <PostCollapsible id="6a91848c-16ec-4a23-bc45-51c797b5b2c3--default">
      <p className="border rounded p-24">This is collapsible content that can be shown or hidden.</p>
    </PostCollapsible>

  <h2>DatePicker</h2>
  <PostDatePicker textToggleCalendar="Open calendar" textNextDecade="Next decade" textNextMonth="Next month" textNextYear="Next year" textPreviousDecade="Previous decade" textPreviousMonth="Previous month" textPreviousYear="Previous year" textSwitchYear="Switch to year view" id="main">
      <input className="form-control" type="text" />
      <p className="form-hint">Format: DD.MM.YYYY</p>
    </PostDatePicker>

  <h2>Icon</h2>
  <PostIcon name="stampapostplus" />

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
  <PostMenuTrigger for="menu--default">  <button className="btn btn-secondary">Open Menu</button>  </PostMenuTrigger>

  <PostMenu id="menu--default" label="Menu description">
      <PostMenuItem ><a href="/first">First menu item</a></PostMenuItem>
      <PostMenuItem ><a href="/second">Second menu item</a></PostMenuItem>
      <PostMenuItem ><a href="/third">Third menu item</a></PostMenuItem>
      </PostMenu>

  <h2>NumberInput</h2>
  <PostNumberInput className="form-floating">
    <input type="number" id="number-input--default" className="form-control" placeholder="" aria-describedby="form-hint-d5f43fa8-42ba-4cb9-98c7-9386d4c939bb--default" />
   <label className="form-label" htmlFor="number-input--default">Quantity</label> 
      </PostNumberInput>

  <h2>Pagination</h2>
  <PostPagination page={1} pageSize={10} collectionSize={100} label="Pagination" textPrevious="Previous page" textNext="Next page" textPage="Page" textFirst="First page" textLast="Last page"></PostPagination>

  <h2>Popover</h2>
  <PostPopoverTrigger for="popover-one">
      <button className="btn btn-secondary">Popover Trigger</button>
    </PostPopoverTrigger>

  <h2>Popover</h2>
  <PostPopover id="popover-one" textClose="Close" data-version="10.0.0-next.67" data-hydrated="">
      <p id="testtext">This is a <a href="">test</a></p>
    </PostPopover>

  <h2>Rating</h2>
  <PostRating label="Rating" />

  <h2>Stepper</h2>
  <PostStepper textCompletedStep="Completed step" textCurrentStep="Current step" textStepNumber="Step #number:" currentIndex={2}>
       <PostStepperItem > Step 1 label</PostStepperItem>  <PostStepperItem > Step 2 label</PostStepperItem>  <PostStepperItem > Step 3 label</PostStepperItem>  <PostStepperItem > Step 4 label</PostStepperItem>  <PostStepperItem > Step 5 label</PostStepperItem> 
    </PostStepper>

  <h2>Tabs</h2>
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

  <h2>Togglebutton</h2>
  <PostTogglebutton className="btn btn-primary">
      <span data-showwhen="untoggled">Untoggled</span>
      <span data-showwhen="toggled">Toggled</span>
    </PostTogglebutton>

  <h2>Tooltip</h2>
  <PostTooltipTrigger for="tooltip-one">
      <button className="btn btn-secondary btn-large">Button</button></PostTooltipTrigger>

  <PostTooltip id="tooltip-one" className="palette palette-accent" placement="top">
      Hi there 👋
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
