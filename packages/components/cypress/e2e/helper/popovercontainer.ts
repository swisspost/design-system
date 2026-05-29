export function getPopoverOpenSelector(): string {
  if (typeof CSS !== 'undefined' && CSS.supports) {
    if (CSS.supports('selector(:popover-open)')) {
      return ':popover-open';
    }
    if (CSS.supports('selector(:open)')) {
      return ':open';
    }
  }
  return String.raw`.\:popover-open`;
}
