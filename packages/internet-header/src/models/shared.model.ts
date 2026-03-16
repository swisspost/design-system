export interface LinkListConfig<T extends SimpleLinkConfig = LinkConfig> {
  title: string | SimpleLinkConfig; // List heading (plain text or link).
  items: Array<T>; // Links contained in this list.
}

export type LinkConfig = SimpleLinkConfig | IconLinkConfig | ImageLinkConfig;

export interface ImageLinkConfig extends SimpleLinkConfig {
  image: {
    src: string; // Image URL.
    alt: string; // Alternative text for the image.
  };
}

export interface IconLinkConfig extends SimpleLinkConfig {
  icon: string; // Icon name.
}

export interface SimpleLinkConfig extends AccessibleTextConfig {
  url: string; // Target URL of the link.
  active?: boolean; // Whether the link represents the current page.
}

export interface AccessibleTextConfig {
  text: string; // Base text content, can be visible or visually hidden.
  label?: string; // ARIA label, screen readers will use this instead of `text`.
  description?: string; // ARIA description for additional context, read after `text` or `label`.
}
