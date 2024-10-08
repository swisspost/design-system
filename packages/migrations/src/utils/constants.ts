export const breakpoints = [ 'xs', 'sm', 'rg', 'md', 'lg', 'xl', 'xxl' ];

const bootstrapSizes = [ '0', '1', '2', '3', '4', '5', 'auto' ];


const postSizes = [
  'hair',
  'line',
  'micro',
  'mini',
  'small-regular',
  'regular',
  'small-large',
  'large',
  'big',
  'bigger-big',
  'small-huge',
  'huge',
  'small-giant',
  'giant',
  'bigger-giant',
];

export const sizes = [ ...bootstrapSizes, ...postSizes ];

export const themeColors = [
  'primary',
  'secondary',
  'success',
  'info',
  'warning',
  'danger',
  'active',
  'white',
  'light',
  'dark',
  'nightblue',
  'nightblue-bright',
  'petrol',
  'petrol-bright',
  'coral',
  'coral-bright',
  'olive',
  'olive-bright',
  'purple',
  'purple-bright',
  'aubergine',
  'aubergine-bright',
];

// list of all inputs and outputs of directives that can create an instance of formControl
// - https://angular.io/api/forms/FormControlDirective#properties
// - https://angular.io/api/forms/FormControlName#properties
// - https://angular.io/api/forms/NgModel#properties
export const formControlProperties = [
  '[formControl]',
  'formControlName',
  '[formControlName]',
  'ngModel',
  '[ngModel]',
  '[(ngModel)]',
  '(ngModelChange)',
  '[ngModelOptions]',
  'name',
  '[name]',
  'disabled',
  '[disabled]',
];

// list of all the template variable references of directives that can create an instance of formControl
// - https://angular.io/api/forms/FormControlDirective#template-variable-references
// - https://angular.io/api/forms/NgModel#template-variable-references
export const formControlReferences = [
  'ngForm',
  'ngModel',
];
