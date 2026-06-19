export const deepNesting = `
  <ul>
    <li>
      <post-collapsible-trigger>
        <button class="post-side-navigation-item">
          Level 1
          <post-icon name="chevrondown" aria-hidden="true"></post-icon>
        </button>
        <post-collapsible>
          <ul>
            <li>
              <post-collapsible-trigger>
                <button class="post-side-navigation-item">
                  Level 2
                  <post-icon name="chevrondown" aria-hidden="true"></post-icon>
                </button>
                <post-collapsible>
                  <ul>
                    <li>
                      <post-collapsible-trigger>
                        <button class="post-side-navigation-item">
                          Level 3
                          <post-icon name="chevrondown" aria-hidden="true"></post-icon>
                        </button>
                        <post-collapsible>
                          <ul>
                            <li><a href="#" class="post-side-navigation-item">Level 4 Item</a></li>
                            <li><a href="#" class="post-side-navigation-item">Level 4 Item</a></li>
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