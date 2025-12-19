export type CurveEasing = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
};

export type PresetEasing = 'linear' | 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out';

export interface AnimationOptions {
  translate: number;
  duration: number;
  easing: CurveEasing | PresetEasing;
  fill: FillMode;
}
