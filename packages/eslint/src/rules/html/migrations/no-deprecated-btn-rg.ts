import { createClassUpdateRule } from '../../../utils/create-class-update-rule';

export const name = 'no-deprecated-btn-rg';

export default createClassUpdateRule({
  name,
  type:'suggestion',
  description: 'Flags deprecated "btn-rg" class and suggests removal or replacement with "btn-sm".',
  messages: {
    deprecatedBtnRg: 'The "btn-rg" class is deprecated. Please remove it or replace it with "btn-sm".',
  },
  mutations: {
    deprecatedBtnRg: ['btn-rg', 'btn-sm']
  },
});
