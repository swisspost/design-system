import { Component, h, Host, Prop } from '@stencil/core';
import { state } from '@/data/store';
import { Link } from '@/components/internal';
import '@swisspost/design-system-components';

@Component({
  tag: 'swisspost-internet-login-widget',
  styleUrl: 'post-internet-login-widget.scss',
  shadow: true,
})
export class PostInternetLoginWidget {
  /**
   * Label for the "Current user is {user}" accessibility description.
   * Use `{user}` as a placeholder — it will be replaced with the current user's name at runtime.
   */
  @Prop({ reflect: true }) readonly textCurrentUser!: string;

  /**
   * Accessible label for the dropdown menu.
   */
  @Prop({ reflect: true }) readonly textUserMenu!: string;

  /**
   * Hidden label for the user menu trigger button, for accessibility purposes.
   */
  @Prop({ reflect: true }) readonly textUserMenuTrigger!: string;

  render() {
    if (!state.localizedConfig?.header) {
      return null;
    }

    const { globalHeader } = state.localizedConfig.header;

    return (
      <Host>
        <post-login-widget
          textCurrentUser={this.textCurrentUser}
          textUserMenu={this.textUserMenu}
          textUserMenuTrigger={this.textUserMenuTrigger}
        >
          {globalHeader.login && 'url' in globalHeader.login && (
            <Link slot="login-link" config={globalHeader.login} />
          )}
          <div slot="user-links">
            {globalHeader.userMenuLinks?.map(link => (
              <post-menu-item key={link.url}>
                <a href={link.url}>
                  <post-icon aria-hidden="true" name={link.icon}></post-icon>
                  {link.text}
                </a>
              </post-menu-item>
            ))}
          </div>
        </post-login-widget>
      </Host>
    );
  }
}
