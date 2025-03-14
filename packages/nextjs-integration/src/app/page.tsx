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
  PostPopover,
  PostRating,
  PostTabs,
  PostTabHeader,
  PostTabPanel,
  PostTag,
  PostTooltip,
  PostList,
  PostListItem,
} from '@swisspost/design-system-components-react';

export default function Home() {
  return (
    <>
      <h1>Design System Components</h1>
      <PostList id="grid-1">
        <h3>Title 1</h3>

        <PostListItem>
          <a href="#test">Text link 1</a>
        </PostListItem>

        <PostListItem>
          <a href="#test">Text link 2</a>
        </PostListItem>

        <PostListItem>
          <a href="#test">Text link 3</a>
        </PostListItem>

        <PostListItem>
          <a href="#test">Text link 4</a>
        </PostListItem>

        <PostListItem>
          <a href="#test">Text link 5</a>
        </PostListItem>

        <PostListItem>
          <a href="#test">Text link 6</a>
        </PostListItem>
      </PostList>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea debitis ex rem minus! Ut
        mollitia deserunt iure impedit. Enim, officia. Fugiat, cupiditate repellat? Excepturi est
        iusto suscipit, omnis iste laboriosam!
      </p>

      <h2>Accordion</h2>
      <PostAccordion heading-level="3">
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
      {/* <PostCollapsibleTrigger for="6a91848c-16ec-4a23-bc45-51c797b5b2c3--default">
        <button className="btn btn-secondary" aria-haspopup="menu" aria-expanded="true">
          Toggle Collapsible
        </button>
      </PostCollapsibleTrigger> */}

      <PostCollapsible id="6a91848c-16ec-4a23-bc45-51c797b5b2c3--default">
        <p className="border rounded p-24">
          Contentus momentus vero siteos et accusam iretea et justo.
        </p>
      </PostCollapsible>

      <h2>Icon</h2>
      <PostIcon name="1000" />

      <h2>Linkarea</h2>
      {/* <PostLinkarea>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Titulum</h5>
            <p className="card-text">Contentus momentus vero siteos et accusam iretea et justo.</p>
            <a className="card-link" href="#test">
              Ligilo teksto
            </a>
            <a className="card-link" href="#test">
              Pli da ligo
            </a>
          </div>
        </div>
      </PostLinkarea> */}

      <h2>Popover</h2>
      <div className="d-flex justify-content-center">
        {/* The aria-expanded attribute need to be defined on the trigger already, otherwise nextjs will report a hydration error */}
        <button
          className="btn btn-secondary btn-large"
          data-popover-target="popover-one"
          aria-expanded="false"
        >
          Click here to see a popover
        </button>
      </div>
      <PostPopover className="palette-alternate" id="popover-one" placement="top" arrow={true}>
        <h2 className="h6">Optional title</h2>
        <p className="mb-0">
          A longer message that needs more time to read. <a href="#test">Links</a> are also
          possible.
        </p>
      </PostPopover>

      <h2>Rating</h2>
      <PostRating></PostRating>

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
      <PostTag>Tag</PostTag>

      <h2>Tooltip</h2>
      {/* The aria-describedby attribute need to be defined on the trigger already, otherwise nextjs will report a hydration error */}
      <button
        className="btn btn-secondary btn-large"
        data-tooltip-target="tooltip-one"
        aria-describedby="tooltip-one"
      >
        Button
      </button>
      <PostTooltip id="tooltip-one" className="palette-alternate" placement="top" delayed={false}>
        Hi there 👋
      </PostTooltip>
    </>
  );
}
