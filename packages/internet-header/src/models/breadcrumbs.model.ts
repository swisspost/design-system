import { Link } from './general.model';

/**
 * Breadcrumb trail from the root to the current page.
 */
export interface Breadcrumbs {
  rootUrl: string;
  items: Array<Link>;
}

export interface AdditionalAttribute {
  name: string;
  value: string;
}
