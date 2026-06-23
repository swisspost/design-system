import { findClosestAcrossShadow } from './event-from';

export interface ClosableTarget {
  element: Element;
  close: (el: Element) => void;
}

/**
 * Ordered list of closable target matchers. Each entry is checked in order against the
 * current element during the ancestor walk; the first match wins. Custom components must
 * come before native element matchers so that, for example, post-popovercontainer (which
 * carries a popover attribute) is matched by its tag, not by the generic [popover] rule.
 */
const CLOSABLE_TARGETS: ReadonlyArray<{
  predicate: (el: Element) => boolean;
  close: (el: Element) => void;
}> = [
  {
    predicate: el => el.localName === 'post-banner',
    close: el => void (el as HTMLPostBannerElement).dismiss(),
  },
  {
    predicate: el => el.localName === 'post-popover',
    close: el => void (el as HTMLPostPopoverElement).hide(),
  },
  {
    predicate: el => el.localName === 'post-popovercontainer',
    close: el => void (el as HTMLPostPopovercontainerElement).hide(),
  },
  {
    predicate: el => el.localName === 'post-collapsible',
    close: el => void (el as HTMLPostCollapsibleElement).toggle(false),
  },
  {
    predicate: el => el.localName === 'post-accordion-item',
    close: el => void (el as HTMLPostAccordionItemElement).toggle(false),
  },
  {
    predicate: el => el.localName === 'dialog',
    close: el => (el as HTMLDialogElement).close(),
  },
  {
    predicate: el => el.hasAttribute('popover'),
    close: el => (el as HTMLElement).togglePopover(false),
  },
];

export function findClosableTarget(start: Element): ClosableTarget | null {
  const el = findClosestAcrossShadow(
    start,
    (el): el is Element => CLOSABLE_TARGETS.some(t => t.predicate(el)),
  );
  if (!el) return null;
  const match = CLOSABLE_TARGETS.find(t => t.predicate(el))!;
  return { element: el, close: match.close };
}
