import * as defaultRenderers from '@root/src/stories/components/header/renderers';

export type SubComponentRenderers = Partial<typeof defaultRenderers>;

export function getSubComponentRenderers(
  customRenderers: SubComponentRenderers,
): Required<SubComponentRenderers> {
  return { ...defaultRenderers, ...customRenderers };
}
