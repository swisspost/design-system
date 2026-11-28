// Where a level-1 item can get an icon, see `withLevel1Icons`
const LEVEL_1_ICON_SLOT = '<!-- level-1-icon -->';

const smallExpanded = `<ul>
        <li>
          <a href="#" class="post-side-navigation-item">
            ${LEVEL_1_ICON_SLOT}
            Level 1
          </a>
        </li>
        <li>
          <a href="#" class="post-side-navigation-item">
            ${LEVEL_1_ICON_SLOT}
            Level 1
          </a>
          <ul>
            <li><a href="#" class="post-side-navigation-item">Level 2</a></li>
            <!-- Mark the current page link with aria-current="page". Highlights the active item visually and
                for screen readers. Set from your routing, not on click. -->
            <li><a href="#" class="post-side-navigation-item" aria-current="page">Level 2 (active)</a></li>
          </ul>
        </li>
        <li>
          <a href="#" class="post-side-navigation-item">
            ${LEVEL_1_ICON_SLOT}
            Level 1
          </a>
          <ul>
            <li><a href="#" class="post-side-navigation-item">Level 2</a></li>
            <li>
              <a href="#" class="post-side-navigation-item">Level 2</a>
              <ul>
                <li><a href="#" class="post-side-navigation-item">Level 3</a></li>
                <li>
                  <a href="#" class="post-side-navigation-item">Level 3</a>
                  <ul>
                    <li><a href="#" class="post-side-navigation-item">Level 4</a></li>
                    <li><a href="#" class="post-side-navigation-item">Level 4</a></li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>`;

const largeCollapsible = `<ul>
        <li>
          <a href="#" class="post-side-navigation-item">
            ${LEVEL_1_ICON_SLOT}
            Level 1
          </a>
        </li>
        <li>
          <post-collapsible-trigger>
            <button class="post-side-navigation-item">
              ${LEVEL_1_ICON_SLOT}
              Level 1
              <post-icon name="chevrondown" aria-hidden="true"></post-icon>
            </button>
            <post-collapsible>
              <ul>
                <!-- Mark the current page link with aria-current="page". Highlights the active item visually and
                    for screen readers. Set from your routing, not on click. -->
                <li><a href="#" class="post-side-navigation-item" aria-current="page">Level 2 (active)</a></li>
                <li><a href="#" class="post-side-navigation-item">Level 2</a></li>
                <li>
                  <post-collapsible-trigger>
                    <div class="post-side-navigation-item">
                      <a href="#">Level 2</a>
                      <button>
                        <span class="visually-hidden">Expand</span>
                        <post-icon name="chevrondown" aria-hidden="true"></post-icon>
                      </button>
                    </div>
                    <post-collapsible collapsed>
                      <ul>
                        <li><a href="#" class="post-side-navigation-item">Level 3</a></li>
                      </ul>
                    </post-collapsible>
                  </post-collapsible-trigger>
                </li>
                <li>
                  <post-collapsible-trigger>
                    <button class="post-side-navigation-item">
                      Level 2
                      <post-icon name="chevrondown" aria-hidden="true"></post-icon>
                    </button>
                    <post-collapsible collapsed>
                      <ul>
                        <li><a href="#" class="post-side-navigation-item">Level 3</a></li>
                        <li>
                          <post-collapsible-trigger>
                            <div class="post-side-navigation-item">
                              <a href="#">Level 3</a>
                              <button>
                                <span class="visually-hidden">Expand</span>
                                <post-icon name="chevrondown" aria-hidden="true"></post-icon>
                              </button>
                            </div>
                            <post-collapsible collapsed>
                              <ul>
                                <li><a href="#" class="post-side-navigation-item">Level 4</a></li>
                              </ul>
                            </post-collapsible>
                          </post-collapsible-trigger>
                        </li>
                        <li>
                          <post-collapsible-trigger>
                            <button class="post-side-navigation-item">
                              Level 3
                              <post-icon name="chevrondown" aria-hidden="true"></post-icon>
                            </button>
                            <post-collapsible collapsed>
                              <ul>
                                <li><a href="#" class="post-side-navigation-item">Level 4</a></li>
                                <li><a href="#" class="post-side-navigation-item">Level 4</a></li>
                              </ul>
                            </post-collapsible>
                          </post-collapsible-trigger>
                        </li>
                      </ul>
                    </post-collapsible>
                  </post-collapsible-trigger>
                </li>
              </ul>
            </post-collapsible>
          </post-collapsible-trigger>
        </li>
        <li>
          <post-collapsible-trigger>
            <div class="post-side-navigation-item">
              <a href="#">
                ${LEVEL_1_ICON_SLOT}
                Level 1
              </a>
              <button>
                <span class="visually-hidden">Expand</span>
                <post-icon name="chevrondown" aria-hidden="true"></post-icon>
              </button>
            </div>
            <post-collapsible collapsed>
              <ul>
                <li><a href="#" class="post-side-navigation-item">Level 2</a></li>
                <li><a href="#" class="post-side-navigation-item">Level 2</a></li>
              </ul>
            </post-collapsible>
          </post-collapsible-trigger>
        </li>
      </ul>`;

/**
 * Icons must be used on all level-1 items or none of them, never on deeper levels.
 */
function withLevel1Icons(nav: string, showIcons: boolean): string {
  const icon = '<post-icon name="letter" aria-hidden="true"></post-icon>';
  // Replaces the whole line of the slot, so no empty line is left without icons
  const slotLine = new RegExp(`^( *)${LEVEL_1_ICON_SLOT}\n`, 'gm');
  return nav.replace(slotLine, showIcons ? `$1${icon}\n` : '');
}

const defaultNavContent = {
  collapsible: `
      <h2 class="post-side-navigation-heading">Expandable content</h2>

      ${largeCollapsible}
`,
  expanded: `
      <h2 class="post-side-navigation-heading">Always expanded</h2>

      ${smallExpanded}
`,
};

// Expandable items are either all collapsible or all always expanded, never mixed
export type ExpandableItems = keyof typeof defaultNavContent;

export const getDefaultNav = ({
  expandableItems = 'collapsible',
  showIcons = false,
}: { expandableItems?: ExpandableItems; showIcons?: boolean } = {}) =>
  withLevel1Icons(defaultNavContent[expandableItems], showIcons);

export const smallNav = withLevel1Icons(smallExpanded, false);

export const largeNav = withLevel1Icons(
  `
      <h2 class="post-side-navigation-heading">Section title (optional)</h2>


      ${largeCollapsible}
      <h2 class="post-side-navigation-heading">Section title (optional)</h2>

      ${largeCollapsible}
`,
  true,
);
