import {
  PostAccordion,
  PostAccordionItem,
  PostAvatar,
  PostBanner,
  PostCardControl,
  PostClosebutton,
  PostCollapsible,
  PostCollapsibleTrigger,
  PostIcon,
  PostLinkarea,
  PostMenu,
  PostMenuItem,
  PostMenuTrigger,
  PostPagination,
  PostPopover,
  PostPopoverTrigger,
  PostRating,
  PostTabs,
  PostTabHeader,
  PostTabPanel,
  PostTooltipTrigger,
  PostTooltip,
  PostStepper,
  PostStepperItem,
} from '@swisspost/design-system-components-react/server';

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

      <h2>Avatar</h2>
      <PostAvatar firstname="Firstname" lastname="Lastname"></PostAvatar>

      <h2>Banner</h2>
      <PostBanner>
        <p>Contentus momentus vero siteos et accusam iretea et justo.</p>
      </PostBanner>

      <h2>Card Control</h2>
      <PostCardControl label="Label" type="checkbox" />

      <h2>Close Button</h2>
      <PostClosebutton>Close button</PostClosebutton>

      <h2>Collapsible</h2>
      {/* The aria attributes need to be defined on the button already, otherwise nextjs will report a hydration error */}
      <PostCollapsibleTrigger for="6a91848c-16ec-4a23-bc45-51c797b5b2c3--default">
        <button
          className="btn btn-secondary"
          aria-expanded={true}
          aria-controls="6a91848c-16ec-4a23-bc45-51c797b5b2c3--default"
        >
          Toggle Collapsible
        </button>
      </PostCollapsibleTrigger>

      <PostCollapsible id="6a91848c-16ec-4a23-bc45-51c797b5b2c3--default">
        <p className="border rounded p-24">
          Contentus momentus vero siteos et accusam iretea et justo.
        </p>
      </PostCollapsible>

      <h2>Icon</h2>
      <PostIcon name="1000" />

      <h2>Linkarea</h2>
      <PostLinkarea>
        <div className="card">
          <div className="card-body">
            <h5>Titulum</h5>
            <p>Contentus momentus vero siteos et accusam iretea et justo.</p>
            <a className="card-link" href="#test">
              Ligilo teksto
            </a>
            <a className="card-link" href="#test">
              Pli da ligo
            </a>
          </div>
        </div>
      </PostLinkarea>

      <h2>Menu</h2>
      {/* Throws Hydration Errors */}
      <PostMenuTrigger for="menu-one">
        <button className="btn btn-primary">Menu button</button>
      </PostMenuTrigger>
      <PostMenu id="menu-one">
        <PostMenuItem>
          <button>Example 1</button>
        </PostMenuItem>
        <PostMenuItem>
          <a href="#test">Example 2</a>
          <PostMenuItem>
            <div>Example 3</div>
          </PostMenuItem>
        </PostMenuItem>
      </PostMenu>

      <h2>Popover</h2>
      <PostPopoverTrigger for="popover-one">
        {/* The aria-expanded attribute need to be defined on the trigger already, otherwise nextjs will report a hydration error */}
        <button className="btn btn-secondary btn-large">Click here to see a popover</button>
      </PostPopoverTrigger>
      <PostPopover
        className="palette palette-alternate"
        id="popover-one"
        placement="top"
        closeButtonCaption="Close Popover"
        arrow={true}
      >
        <h2 className="h6">Optional title</h2>
        <p className="mb-0">
          A longer message that needs more time to read. <a href="#test">Links</a> are also
          possible.
        </p>
      </PostPopover>

      <h2>Rating</h2>
      <PostRating label="Rating"></PostRating>

      <h2>Tabs</h2>
      <PostTabs>
        <PostTabHeader panel="unua">Unua langeto</PostTabHeader>
        <PostTabHeader panel="dua">Dua langeto</PostTabHeader>
        <PostTabHeader panel="tria">Tria langeto</PostTabHeader>

        <PostTabPanel name="unua">
          Jen la enhavo de la unua langeto. Defaŭlte ĝi montriĝas komence.
        </PostTabPanel>
        <PostTabPanel name="dua">
          Jen la enhavo de la dua langeto. Defaŭlte ĝi estas kaŝita komence.
        </PostTabPanel>
        <PostTabPanel name="tria">
          Jen la enhavo de la tria langeto. Defaŭlte ĝi ankaŭ estas kaŝita komence.
        </PostTabPanel>
      </PostTabs>

      <h2>Tag</h2>

      <h2>Tooltip</h2>
      <PostTooltipTrigger for="tooltip-one">
        {/* The aria-describedby attribute need to be defined on the button already, otherwise we'll get a hydration error */}
        <button className="btn btn-secondary btn-large" aria-describedby="undefined tooltip-one">
          Button
        </button>
      </PostTooltipTrigger>
      <PostTooltip id="tooltip-one" className="palette palette-accent" placement="top">
        Hi there 👋
      </PostTooltip>

      <h2>Post Stepper</h2>
      <PostStepper
        completedLabel="Completed step"
        currentLabel="Current step"
        activeStepLabel="Step #index:"
        currentIndex={1}
      >
        <PostStepperItem> Step 1 </PostStepperItem>
        <PostStepperItem> Step 2 </PostStepperItem>
        <PostStepperItem> Step 3 </PostStepperItem>
        <PostStepperItem> Step 4 </PostStepperItem>
      </PostStepper>

      <h2>Pagination</h2>
      <PostPagination
        page={1}
        pageSize={10}
        collectionSize={100}
        disabled={false}
        label="Pagination"
        labelPrevious="Previous page"
        labelNext="Next page"
        labelPage="Page"
        labelFirst="First page"
        labelLast="Last page"
      />
    </>
  );
}
