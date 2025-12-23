export type CurveEasing = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
};

const headerEase: CurveEasing = {
  x1: 0.8,
  y1: 0.2,
  x2: 0.8,
  y2: 0.7,
};

export const PRESET_MAP: Record<PresetEasing | 'headerEase', CurveEasing | PresetEasing> = {
  'linear': 'linear',
  'ease': 'ease',
  'ease-in': 'ease-in',
  'ease-out': 'ease-out',
  'ease-in-out': 'ease-in-out',
  'headerEase': headerEase,
};

export type PresetEasing =
  | 'linear'
  | 'ease'
  | 'ease-in'
  | 'ease-out'
  | 'ease-in-out'
  | 'headerEase';

export interface AnimationOptions {
  duration: number;
  easing: CurveEasing | PresetEasing;
  fill: FillMode;
}
