import { createClassUpdateRuleWrapper } from '../../../utils/create-class-update-rule';

export const { name, data, rule } = createClassUpdateRuleWrapper({
  name: 'no-deprecated-loader',
  type: 'problem',
  description: 'Flags deprecated "loader-*" classes and replace them with "spinner-*" classes.',
  classesMap: [
    { old: 'loader', new: 'spinner' },
    { old: 'loading-modal', new: 'spinner-modal' },
    { old: 'loader-xs', new: 'spinner-16' },
    { old: 'loader-sm', new: 'spinner-40' },
    { old: 'loader-12', new: 'spinner-12' },
    { old: 'loader-16', new: 'spinner-16' },
    { old: 'loader-24', new: 'spinner-24' },
    { old: 'loader-32', new: 'spinner-32' },
    { old: 'loader-40', new: 'spinner-40' },
    { old: 'loader-48', new: 'spinner-48' },
    { old: 'loader-80', new: 'spinner-80' },
  ],
});

export default rule;
