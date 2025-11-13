import { createClassUpdateRuleWrapper } from '../../../utils/create-class-update-rule';

export const { name, data, rule } = createClassUpdateRuleWrapper({
  name: 'no-deprecated-position-helpers',
  type: 'problem',
  description:
    'Flags deprecated bootstrap position helpers "fixed-{top|bottom}" and "sticky-{top|bottom}" classes and replace them with a combination of other utility classes.',
  classesMap: [
    { old: 'fixed-top', new: 'position-fixed top-0 start-0 end-0 z-fixed' },
    { old: 'fixed-bottom', new: 'position-fixed bottom-0 start-0 end-0 z-fixed' },
    { old: 'sticky-top', new: 'position-sticky top-0 z-header' },
    { old: 'sticky-bottom', new: 'position-sticky bottom-0 z-header' },
  ],
});

export default rule;
