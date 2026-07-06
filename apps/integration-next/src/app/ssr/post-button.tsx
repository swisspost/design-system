import { ReactNode } from 'react';
import {
  PostIcon,
  PostTooltip,
  PostTooltipTrigger,
} from '@swisspost/design-system-components-react/server';

let buttonIdCounter = 0;

interface PostButtonProps {
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'tertiary' | 'link';
  disabled?: boolean;
  iconLeft?: string | null;
  iconRight?: string | null;
  iconOnly?: string | null;
  children?: ReactNode;
}

function getButtonClass(variant: NonNullable<PostButtonProps['variant']>): string {
  const classes = ['btn'];
  switch (variant) {
    case 'primary':
      classes.push('btn-primary');
      break;
    case 'secondary':
      classes.push('btn-secondary');
      break;
    case 'tertiary':
      classes.push('btn-tertiary');
      break;
    case 'link':
      classes.push('btn-link');
      break;
    default:
      classes.push('btn-secondary');
      break;
  }
  return classes.join(' ');
}

export function PostButton({
  type = 'button',
  variant = 'secondary',
  disabled = false,
  iconLeft = null,
  iconRight = null,
  iconOnly = null,
  children,
}: PostButtonProps) {
  const buttonClass = getButtonClass(variant);
  const tooltipId = `post-button-icon-only-tooltip-${buttonIdCounter++}`;

  if (iconOnly) {
    return (
      <PostTooltipTrigger for={tooltipId}>
        <button type={type} disabled={disabled} className={buttonClass}>
          <PostIcon name={iconOnly}></PostIcon>
        </button>
        <PostTooltip id={tooltipId}>
          <>{children}</>
        </PostTooltip>
      </PostTooltipTrigger>
    );
  }

  return (
    <button type={type} disabled={disabled} className={buttonClass}>
      {iconLeft && <PostIcon name={iconLeft}></PostIcon>}
      {children}
      {iconRight && <PostIcon name={iconRight}></PostIcon>}
    </button>
  );
}
