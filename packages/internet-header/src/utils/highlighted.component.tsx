import { h } from '@stencil/core';

export const HighlightedText = (props: { text: string; highlightClass?: string }) => {
  const highlightClass = props.highlightClass ?? 'bold';
  const highlightedString = props.text
    .replace(/[{(]/g, `<span class="${highlightClass}">`)
    .replace(/[})]/g, '</span>')
    .replace(/[[\]]/g, '');
  return <span innerHTML={highlightedString}></span>;
};
