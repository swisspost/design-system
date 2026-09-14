export type Side = 'top' | 'right' | 'bottom' | 'left';

const OPPOSITES: Record<Side, Side> = {
  top: 'bottom',
  right: 'left',
  bottom: 'top',
  left: 'right',
};

export function oppositeSide(side: Side): Side {
  return OPPOSITES[side];
}
