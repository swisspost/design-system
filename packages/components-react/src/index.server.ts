import { Children, cloneElement, createElement, isValidElement, type ComponentProps } from 'react';
import {
  PostAccordion as StencilPostAccordion,
  PostAccordionItem,
} from './stencil-generated/components.server.js';

export * from './stencil-generated/components.server.js';

type AccordionProps = ComponentProps<typeof StencilPostAccordion>;
type AccordionItemProps = ComponentProps<typeof PostAccordionItem>;

export function PostAccordion({ children, findable, ...props }: AccordionProps) {
  const items = Children.map(children, child => {
    if (!isValidElement<AccordionItemProps>(child) || child.type !== PostAccordionItem)
      return child;
    return cloneElement(child, { findable: Boolean(findable) });
  });

  return createElement(StencilPostAccordion, { ...props, findable }, items);
}
