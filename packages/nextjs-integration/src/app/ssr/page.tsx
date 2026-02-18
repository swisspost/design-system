import {
  PostAccordion,
  PostAccordionItem,
  PostAvatar,
  PostBanner,
  PostCardControl,
  PostClosebutton,
  PostCollapsible,
  PostCollapsibleTrigger,
  PostLinkarea,
  PostMenu,
  PostMenuItem,
  PostMenuTrigger,
  PostPagination,
  PostPopover,
  PostPopoverTrigger,
  PostRating,
  PostTabs,
  PostTabItem,
  PostTabPanel,
  PostTogglebutton,
  PostTooltipTrigger,
  PostTooltip,
  PostStepper,
  PostStepperItem,
} from '@swisspost/design-system-components-react/server';
import {
  PostIconExplosives,
  PostIconLetter,
  PostIconLetterSolid,
} from '@swisspost/design-system-components-react/icons';

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

      <h2>Icons</h2>

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

      <h2>Linkarea</h2>
      <PostLinkarea>
        <div className="card">
          <div className="card-body">
            <h5>Titulum</h5>
            <p>Contentus momentus vero siteos et accusam iretea et justo.</p>
            <a className="card-link" href="#test">
              Ligilo teksto
            </a>
          </div>
        </div>
      </PostLinkarea>

      <h2>Menu</h2>
      {/* Throws Hydration Errors */}
      <PostMenuTrigger for="menu-one">
        <button className="btn btn-primary">Menu button</button>
      </PostMenuTrigger>
      <PostMenu id="menu-one" label="Menu">
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
        textClose="Close"
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

      <h2>Tabs - Panel Variant</h2>
      <PostTabs>
        <PostTabItem name="unua">Unua langeto</PostTabItem>
        <PostTabItem name="dua">Dua langeto</PostTabItem>
        <PostTabItem name="tria">Tria langeto</PostTabItem>

        <PostTabPanel for="unua">
          Jen la enhavo de la unua langeto. Defaŭlte ĝi montriĝas komence.
        </PostTabPanel>
        <PostTabPanel for="dua">
          Jen la enhavo de la dua langeto. Defaŭlte ĝi estas kaŝita komence.
        </PostTabPanel>
        <PostTabPanel for="tria">
          Jen la enhavo de la tria langeto. Defaŭlte ĝi ankaŭ estas kaŝita komence.
        </PostTabPanel>
      </PostTabs>

      <h2>Tabs - Navigation Variant</h2>
      <PostTabs label="Tabs navigation">
        <PostTabItem name="nav-first">
          <a href="#first" aria-current="page">
            First
          </a>
        </PostTabItem>
        <PostTabItem name="nav-second">
          <a href="#second">Second</a>
        </PostTabItem>
        <PostTabItem name="nav-third">
          <a href="#third">Third</a>
        </PostTabItem>
      </PostTabs>

      <h2>Tag</h2>

      <h2>Toggle Button</h2>
      <PostTogglebutton className="btn btn-primary">
        <span data-showwhen="untoggled">Untoggled</span>
        <span data-showwhen="toggled">Toggled</span>
      </PostTogglebutton>

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
        textCompletedStep="Completed step"
        textCurrentStep="Current step"
        textStepNumber="Step #number:"
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
        label="Pagination"
        textPrevious="Previous page"
        textNext="Next page"
        textPage="Page"
        textFirst="First page"
        textLast="Last page"
      />

    </>
  );
}
