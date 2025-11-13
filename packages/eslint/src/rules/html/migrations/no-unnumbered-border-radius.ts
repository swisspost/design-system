import { createClassUpdateRuleWrapper } from '../../../utils/create-class-update-rule';

export const { name, data, rule } = createClassUpdateRuleWrapper({
  name: 'no-unnumbered-border-radius',
  type: 'problem',
  description:
    'Flags "rounded" and "rounded-{top|bottom|start|end}" classes and replaces them with "rounded-4" and "rounded-{top|bottom|start|end}-4", respectively.',
  classesMap: [
    { old: 'rounded', new: 'rounded-4' },
    { old: 'rounded-top', new: 'rounded-top-4' },
    { old: 'rounded-bottom', new: 'rounded-bottom-4' },
    { old: 'rounded-start', new: 'rounded-start-4' },
    { old: 'rounded-end', new: 'rounded-end-4' },
  ],
});

export default rule;
