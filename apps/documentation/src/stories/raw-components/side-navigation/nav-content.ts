export function defaultNav(showIcons: boolean) {
  const icon = (name: string) =>
    showIcons ? `<post-icon name="${name}" aria-hidden="true"></post-icon>` : '';

  return `
      <h2 class="post-side-navigation-heading">Section title (optional)</h2>

      <ul>
        <li>
          <a href="#" class="post-side-navigation-item">
            ${icon('letter')}
            Level 1
          </a>
          <ul>
            <li><a href="#" class="post-side-navigation-item">Level 2</a></li>
            <!-- Mark the current page link with aria-current="page". Highlights the active item visually and 
                for screen readers. Set from your routing, not on click. -->
            <li><a href="#" class="post-side-navigation-item" aria-current="page">Level 2 (active)</a></li>
            <li><a href="#" class="post-side-navigation-item">Level 2</a></li>
          </ul>
        </li>
        <li>
          <a href="#" class="post-side-navigation-item">
            ${icon('send')}
            Level 1
          </a>
        </li>
      </ul>

      <h2 class="post-side-navigation-heading">Section title (optional)</h2>

      <ul>
        <li>
          <post-collapsible-trigger>
            <button class="post-side-navigation-item">
              ${icon('bulkparcels')}
              Level 1
              <post-icon name="chevrondown" aria-hidden="true"></post-icon>
            </button>
            <post-collapsible>
              <ul>
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
      </ul>
`;
}