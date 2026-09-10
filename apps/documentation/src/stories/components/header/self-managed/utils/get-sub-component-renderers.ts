import * as defaultRenderers from '../renderers';

export type SubComponentRenderers = Partial<typeof defaultRenderers>;

export function getSubComponentRenderers(
  customRenderers: SubComponentRenderers,
): Required<SubComponentRenderers> {
  return { ...defaultRenderers, ...customRenderers };
}
