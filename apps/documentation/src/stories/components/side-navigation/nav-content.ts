const smallExpanded = `<ul>
        <li>
          <a href="#" class="post-side-navigation-item">
            Level 1
          </a>
        </li>
        <li>
          <a href="#" class="post-side-navigation-item">
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
            Level 1
          </a>
          <ul>
            <li><a href="#" class="post-side-navigation-item">Level 2</a></li>
            <li>
              <a href="#" class="post-side-navigation-item">Level 2</a>
              <ul>
                <li><a href="#" class="post-side-navigation-item">Level 3</a></li>
                <li><a href="#" class="post-side-navigation-item">Level 3</a></li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>`;

const largeCollapsible = `<ul>
        <li>
          <a href="#" class="post-side-navigation-item">
            <post-icon name="letter" aria-hidden="true"></post-icon>
            Level 1
          </a>
        </li>
        <li>
          <post-collapsible-trigger>
            <button class="post-side-navigation-item">
              <post-icon name="letter" aria-hidden="true"></post-icon>
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
      </ul>`;

export const defaultNav = `
      <h2 class="post-side-navigation-heading">Always expanded</h2>

      ${smallExpanded}

      <h2 class="post-side-navigation-heading">Expandable content</h2>

      ${largeCollapsible}
`;

export const smallNav = smallExpanded;

export const largeNav = `
      <h2 class="post-side-navigation-heading">Section title (optional)</h2>


      ${largeCollapsible}
      <h2 class="post-side-navigation-heading">Section title (optional)</h2>

      ${largeCollapsible}
`;
