import { LinkConfig } from './shared.model';

/**
 * Breadcrumb trail from the root to the current page.
 */
export interface BreadcrumbsConfig {
  rootUrl: string;
  items: Array<LinkConfig>;
}
