const requiredImports = {
  'icon-button': {
    label: 'required if you use icon-only buttons',
    files: ['components/icon-button'],
  },
  'validation': {
    label: 'required if you use validation feedbacks',
    files: ['components/validation', 'icons/signal-icons'],
  },
  'signal-icons': {
    label: 'required for the status icons (info, success, warning, error)',
    files: ['icons/signal-icons'],
  },
};

export interface Props {
  components: string[];
  required?: Partial<Record<keyof typeof requiredImports, boolean>>;
  importText?: string;
}

export function getComponentStyleImports(props: Props, tokens: string) {
  const generateImport = (path: string) => `@use '@swisspost/design-system-styles/${path}.scss';`;
  const components = props.components.map(name => generateImport(`components/${name}`)).join('\n');

  const required = (Object.keys(requiredImports) as Array<keyof typeof requiredImports>)
    .filter(name => props.required?.[name])
    .map(name => {
      const { label, files } = requiredImports[name];
      return `// ${label}\n${files.map(generateImport).join('\n')}`;
    })
    .join('\n');

  return [`${generateImport(tokens)}\n${generateImport('basics')}`, components, required]
    .filter(Boolean)
    .join('\n');
}

export function getStyleImportsText(props: Props): string {
  return props.importText ?? 'To import only the styles required for this component:';
}
