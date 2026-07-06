import {
  PostIconExplosives,
  PostIconLetter,
  PostIconLetterSolid,
} from '@swisspost/design-system-components-react/icons';
import {
  PostAccordion,
  PostAccordionItem,
  PostAutocomplete,
  PostAvatar,
  PostBanner,
  PostClosebutton,
  PostCollapsible,
  PostCollapsibleTrigger,
  PostDatePicker,
  PostIcon,
  PostLinkarea,
  PostListbox,
  PostListboxOption,
  PostMenu,
  PostMenuItem,
  PostMenuTrigger,
  PostNumberInput,
  PostPagination,
  PostPopover,
  PostPopoverTrigger,
  PostProgressbar,
  PostRating,
  PostSideNavigation,
  PostSideNavigationTrigger,
  PostStepper,
  PostStepperItem,
  PostTabItem,
  PostTabPanel,
  PostTabs,
  PostTogglebutton,
  PostTooltip,
  PostTooltipTrigger,
} from '@swisspost/design-system-components-react/server';
import { PostButton } from './post-button';

export default function Home() {
  return (
    <>
      <h1>Design System Components</h1>
      <PostButton disabled={true} iconRight="help">
        Close
      </PostButton>
      <PostButton iconOnly="adduser">
        <span id="imhere">Add user</span>
      </PostButton>
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

      <h2>Date Picker</h2>
      <PostDatePicker
        textToggleCalendar="Open calendar"
        textNextDecade="Next decade"
        textNextMonth="Next month"
        textNextYear="Next year"
        textPreviousDecade="Previous decade"
        textPreviousMonth="Previous month"
        textPreviousYear="Previous year"
        textSwitchYear="Switch to year view"
      >
        <input className="form-control" type="text" />
        <p className="form-hint">Format: DD.MM.YYYY</p>
      </PostDatePicker>

      <h2>Autocomplete</h2>
      <PostAutocomplete clearable={true} textAvailableSuggestions="{count} suggestions available">
        <div className="form-floating">
          <input
            type="text"
            id="autocomplete-country"
            className="form-control"
            placeholder="Search for a country"
          />
          <label htmlFor="autocomplete-country">Country</label>
        </div>
        <PostListbox>
          <PostListboxOption value="Switzerland"></PostListboxOption>
          <PostListboxOption value="Germany"></PostListboxOption>
          <PostListboxOption value="France"></PostListboxOption>
          <PostListboxOption value="Italy"></PostListboxOption>
        </PostListbox>
      </PostAutocomplete>

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

      <h2>Number Input</h2>
      <PostNumberInput className="form-floating">
        <input type="number" id="quantity" className="form-control" placeholder="" />
        <label htmlFor="quantity">Quantity</label>
      </PostNumberInput>

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

      <h2>Progressbar</h2>
      <div className="progressbar">
        <p
          className="progressbar-label"
          id="progressbar-label-a1b2c3d4-e5f6-7890-abcd-ef1234567890--default"
        >
          Loading packages
        </p>
        <p className="progressbar-value">11 of 17</p>
        <PostProgressbar
          value={11}
          min={0}
          max={17}
          aria-valuetext="11 of 17"
          aria-labelledby="progressbar-label-a1b2c3d4-e5f6-7890-abcd-ef1234567890--default"
        ></PostProgressbar>
      </div>

      <h2>Rating</h2>
      <PostRating label="Rating"></PostRating>

      <h2>Side Navigation</h2>
      <PostSideNavigationTrigger for="react-side-nav">
        <button>
          <span>Menu</span>
          <PostIcon aria-hidden="true" name="burger"></PostIcon>
        </button>
      </PostSideNavigationTrigger>

      <PostSideNavigation id="react-side-nav" textClose="Close">
        <nav aria-labelledby="react-side-nav-title">
          <h2 id="react-side-nav-title" className="post-side-navigation-heading">
            Section title
          </h2>
          <ul>
            <li>
              <a href="#" className="post-side-navigation-item">
                Sidenav link
              </a>
            </li>
            <li>
              <a href="#" className="post-side-navigation-item">
                <PostIcon name="search" aria-hidden="true"></PostIcon>
                Sidenav link with icon
              </a>
            </li>
            <li>
              <PostCollapsibleTrigger for="react-side-nav-collapsible">
                <button className="post-side-navigation-item">
                  Sidenav level 1<PostIcon name="chevrondown" aria-hidden="true"></PostIcon>
                </button>
              </PostCollapsibleTrigger>
              <PostCollapsible id="react-side-nav-collapsible">
                <ul>
                  <li>
                    <a href="#" className="post-side-navigation-item">
                      Child link
                    </a>
                  </li>
                  <li>
                    <a href="#" className="post-side-navigation-item">
                      Child link
                    </a>
                  </li>
                </ul>
              </PostCollapsible>
            </li>
          </ul>
        </nav>
      </PostSideNavigation>

      <h2>Stepper</h2>
      <PostStepper
        textCompletedStep="Completed step"
        textCurrentStep="Current step"
        textStepNumber="Step {number}:"
        currentIndex={1}
      >
        <PostStepperItem> Step 1 </PostStepperItem>
        <PostStepperItem> Step 2 </PostStepperItem>
        <PostStepperItem> Step 3 </PostStepperItem>
        <PostStepperItem> Step 4 </PostStepperItem>
      </PostStepper>

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
    </>
  );
}
