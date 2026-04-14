import { IconLinkConfig, ImageLinkConfig, LinkListConfig, SimpleLinkConfig } from './shared.model';

export interface FooterConfig {
  sections?: Array<LinkListConfig<SimpleLinkConfig>>; // Main footer sections.
  socialLinks?: LinkListConfig<IconLinkConfig>; // Social media links (e.g. Facebook, LinkedIn, YouTube).
  appStoreLinks?: LinkListConfig<ImageLinkConfig>; // App store links (e.g. App Store, Google Play).
  companyLinks?: LinkListConfig<SimpleLinkConfig>; // Links to other Post websites.
  complianceLinks?: LinkListConfig<SimpleLinkConfig>; // Legal and compliance links (e.g. Terms & Conditions, Data Protection).
  copyright?: string; // Copyright notice text displayed at the very bottom.
}
