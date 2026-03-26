import { PostAccordion, PostAccordionItem, PostAvatar, PostBackToTop, PostBanner, PostClosebutton, PostCollapsible, PostCollapsibleTrigger, PostDatePicker, PostFooter, PostHeader, PostIcon, PostLanguageMenu, PostLanguageMenuItem, PostLinkarea, PostLogo, PostMainnavigation, PostMegadropdown, PostMegadropdownTrigger, PostMenu, PostMenuItem, PostMenuTrigger, PostNumberInput, PostPagination, PostPopover, PostPopoverTrigger, PostRating, PostStepper, PostStepperItem, PostTabItem, PostTabPanel, PostTabs, PostTogglebutton, PostTooltip, PostTooltipTrigger } from '@swisspost/design-system-components-react/server';

export default function Page() {
  return (
    <>
     <h1>Design System Components</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea debitis ex rem minus! Ut
        mollitia deserunt iure impedit. Enim, officia. Fugiat, cupiditate repellat? Excepturi est
        iusto suscipit, omnis iste laboriosam!
      </p>
 <h4>PopoverTrigger</h4>
  {/* PopoverTrigger */}
  <PostPopoverTrigger for="popover-one">
      <button className="btn btn-secondary">Popover Trigger</button>
    </PostPopoverTrigger>

 <h4>Popover</h4>
  {/* Popover */}
  <PostPopover id="popover-one" textClose="Close" data-version="10.0.0-next.65" data-hydrated="">
      <p id="testtext">This is a <a href="">test</a></p>
    </PostPopover>

 <h4>Accordion</h4>
  {/* Accordion */}
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

 <h4>Avatar</h4>
  {/* Avatar */}
  <PostAvatar firstname="Firstname" description="The current user is Firstname." />

 <h4>Banner</h4>
  {/* Banner */}
  <PostBanner>
      <p>This is the content of the banner. It helps to draw attention to critical messages.</p>
    </PostBanner>

 <h4>Closebutton</h4>
  {/* Closebutton */}
  <PostClosebutton>
      Close
    </PostClosebutton>

 <h4>CollapsibleTrigger</h4>
  {/* CollapsibleTrigger */}
  <PostCollapsibleTrigger for="6a91848c-16ec-4a23-bc45-51c797b5b2c3--default">
      <button className="btn btn-secondary">Toggle Collapsible</button>
    </PostCollapsibleTrigger>

 <h4>Collapsible</h4>
  {/* Collapsible */}
  <PostCollapsible id="6a91848c-16ec-4a23-bc45-51c797b5b2c3--default" dataVersion="10.0.0-next.65" data-hydrated="">
      <p className="border rounded p-24">This is collapsible content that can be shown or hidden.</p>
    </PostCollapsible>

 <h4>DatePicker</h4>
  {/* DatePicker */}
  <PostDatePicker textToggleCalendar="Open calendar" text-next-decade="Next decade" text-next-month="Next month" text-next-year="Next year" text-previous-decade="Previous decade" text-previous-month="Previous month" text-previous-year="Previous year" text-switch-year="Switch to year view" id="main">
      <input className="form-control" type="text" />
      <p className="form-hint">Format: DD.MM.YYYY</p>
    </PostDatePicker>

 <h4>Icon</h4>
  {/* Icon */}
  <PostIcon name="stampapostplus" />

 <h4>MenuTrigger</h4>
  {/* MenuTrigger */}
  <PostMenuTrigger for="menu--default">  <button className="btn btn-secondary">Open Menu</button>  </PostMenuTrigger>

 <h4>Menu</h4>
  {/* Menu */}
  <PostMenu id="menu--default" label="Menu description">
      <PostMenuItem dataVersion="10.0.0-next.65"><a href="/first">First menu item</a></PostMenuItem>
      <PostMenuItem dataVersion="10.0.0-next.65"><a href="/second">Second menu item</a></PostMenuItem>
      <PostMenuItem dataVersion="10.0.0-next.65"><a href="/third">Third menu item</a></PostMenuItem>
      </PostMenu>

 <h4>NumberInput</h4>
  {/* NumberInput */}
  <PostNumberInput className="form-floating">
    <input type="number" className="form-control" id="number-input--default" placeholder="" />
   <label className="form-label" htmlFor="number-input--default">Quantity</label> 
    </PostNumberInput>

 <h4>Pagination</h4>
  {/* Pagination */}
  <PostPagination page={1} pageSize={10} collection-size="100" label="Pagination" text-previous="Previous page" text-next="Next page" text-page="Page" text-first="First page" text-last="Last page" />

 <h4>Rating</h4>
  {/* Rating */}
  <PostRating label="Rating" />

 <h4>Tabs</h4>
  {/* Tabs */}
  <PostTabs>
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

 <h4>Togglebutton</h4>
  {/* Togglebutton */}
  <PostTogglebutton className="btn btn-primary">
      <span data-showwhen="untoggled">Untoggled</span>
      <span data-showwhen="toggled">Toggled</span>
    </PostTogglebutton>

 <h4>Linkarea</h4>
  {/* Linkarea */}
  <PostLinkarea className="palette palette-alternate p-32 rounded-8">
      <h5>My clickable element</h5>
      <p>
        Clicking anywhere within this <code>post-linkarea</code> will click on the link that is
        placed within the component.
      </p>
      <a target="_blank" href="https://post.ch">Link text</a>
    </PostLinkarea>

 <h4>Stepper</h4>
  {/* Stepper */}
  <PostStepper textCompletedStep="Completed step" text-current-step="Current step" text-step-number="Step #number:" current-index="2" selected-index="">
       <PostStepperItem> Step 1 label</PostStepperItem>  <PostStepperItem> Step 2 label</PostStepperItem>  <PostStepperItem> Step 3 label</PostStepperItem>  <PostStepperItem> Step 4 label</PostStepperItem>  <PostStepperItem> Step 5 label</PostStepperItem> 
    </PostStepper>

 <h4>Tooltip</h4>
  {/* Tooltip */}
  <PostTooltip id="tooltip-one" className="palette palette-accent" placement="top" dataVersion="10.0.0-next.65">
      Hi there 👋
    </PostTooltip>

 <h4>TooltipTrigger</h4>
  {/* TooltipTrigger */}
  <PostTooltipTrigger for="tooltip-one">
      <button className="btn btn-secondary btn-large">Button</button></PostTooltipTrigger>
    </>
  );
}
