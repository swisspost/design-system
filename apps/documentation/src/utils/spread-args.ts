import { ElementPart, nothing } from 'lit';
import { AsyncDirective, directive } from 'lit-html/async-directive.js';

type Props = Partial<HTMLElement>;
type Attrs = Record<string, string | null>;

function formatAttrs(argKey: string, argValue: unknown): Attrs {
  // key to kebab case
  const attrKey = argKey.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();

  // value to string
  switch (typeof argValue) {
    case 'object':
    case 'function':
      return { [attrKey]: JSON.stringify(argValue) };
    case 'boolean':
      return { [attrKey]: argValue ? '' : null };
    default:
      return { [attrKey]: argValue ?? '' };
  }
}

export class SpreadArgsDirective<T extends HTMLElement> extends AsyncDirective {
  prevAttrs: Attrs = {};

  render() {
    return nothing;
  }

  update(part: ElementPart, [args]: Parameters<this['render']>) {
    const element = part.element as T;

    const props: Props = {};
    const attrs: Attrs = {};

    Object.entries(args).forEach(([argKey, argValue]) => {
      if (argKey in HTMLElement.prototype) {
        Object.assign(props, { [argKey]: argValue });
      } else {
        Object.assign(attrs, formatAttrs(argKey, argValue));
      }
    });

    // remove previously set attributes
    Object.keys(this.prevAttrs).forEach(attrKey => element.removeAttribute(attrKey));

    // set new attributes
    Object.entries(attrs)
      .filter(([_key, value]) => value !== null)
      .forEach(([attrKey, attrValue]) => element.setAttribute(attrKey, attrValue ?? ''));

    // set properties
    Object.entries(args).forEach(([argKey, argValue]) =>
      Object.assign(element, { [argKey]: argValue }),
    );

    // save attributes to be able to remove them on next run
    this.prevAttrs = attrs;
  }
}

export const spreadArgs = directive(SpreadArgsDirective);
