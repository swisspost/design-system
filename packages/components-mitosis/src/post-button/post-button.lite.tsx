import { Show, useStore } from '@builder.io/mitosis';

export type Props = {
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'tertiary' | 'link';
  disabled?: boolean;
  iconLeft?: string;
  iconRight?: string;
  iconOnly?: string;
  children?: any;
};

export default function PostButton(props: Props) {
  const state = useStore({
    tooltipId: `post-button-icon-only-tooltip-${Math.random().toString(36).slice(2)}`,
    get buttonClass() {
      const classes = ['btn'];
      switch (props.variant) {
        case 'primary':
          classes.push('btn-primary');
          break;
        case 'tertiary':
          classes.push('btn-tertiary');
          break;
        case 'link':
          classes.push('btn-link');
          break;
        case 'secondary':
        default:
          classes.push('btn-secondary');
          break;
      }
      return classes.join(' ');
    },
  });

  return (
    <Show
      when={props.iconOnly}
      else={
        <button type={props.type || 'button'} disabled={props.disabled} class={state.buttonClass}>
          <Show when={props.iconLeft}>
            <post-icon name={props.iconLeft}></post-icon>
          </Show>
          {props.children}
          <Show when={props.iconRight}>
            <post-icon name={props.iconRight}></post-icon>
          </Show>
        </button>
      }
    >
      <post-tooltip-trigger for={state.tooltipId}>
        <button type={props.type || 'button'} disabled={props.disabled} class={state.buttonClass}>
          <post-icon name={props.iconOnly}></post-icon>
        </button>
        <post-tooltip id={state.tooltipId}>{props.children}</post-tooltip>
      </post-tooltip-trigger>
    </Show>
  );
}
