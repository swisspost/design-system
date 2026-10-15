import { version } from '@root/package.json';
import { Component, h, Host, Prop, State } from '@stencil/core';
import { subscribe } from '../post-klp-login-widget/lib/store';

/** Above this the exact number stops being useful and only costs the badge its shape. */
const MAX_SHOWN_UNREAD = 99;

@Component({
  tag: 'post-klp-login-widget-messages',
  styleUrl: 'post-klp-login-widget-messages.scss',
})
export class PostKlpLoginWidgetMessages {
  /**
   * Where the entry points.
   */
  @Prop({ reflect: true }) url!: string;

  /**
   * Label of the entry.
   */
  @Prop() text?: string;

  /**
   * Visually hidden label for the unread count.
   * The placeholder `{count}` will be replaced with the number of unread messages.
   */
  @Prop() textUnread?: string;

  /** Pushed over the event bus by the widget, so it changes without this element changing. */
  @State() private unread: number = 0;

  private unsubscribe?: () => void;

  connectedCallback() {
    this.unsubscribe = subscribe(({ unread }) => {
      this.unread = unread;
    });
  }

  disconnectedCallback() {
    this.unsubscribe?.();
  }

  private renderUnreadCount() {
    if (this.unread === 0) return null;

    return (
      <span class="badge">
        <span aria-hidden="true">
          {this.unread > MAX_SHOWN_UNREAD ? `${MAX_SHOWN_UNREAD}+` : this.unread}
        </span>
        <span class="visually-hidden">
          {this.textUnread?.replace('{count}', String(this.unread))}
        </span>
      </span>
    );
  }

  render() {
    return (
      <Host data-version={version}>
        <post-menu-item>
          <a href={this.url}>
            <post-icon aria-hidden="true" name="letter"></post-icon>
            <span>{this.text}</span>
            {this.renderUnreadCount()}
          </a>
        </post-menu-item>
      </Host>
    );
  }
}
