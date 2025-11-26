interface Props {
  components: string[];
  required?: { icons: boolean; floatingLabel: boolean; formFeedback: boolean };
}

const requiredLabels: { [key: string]: string } = {
  'icons': 'required if you use icons',
  'floating-label': 'required if you use floating-labels',
  'validation': 'required if you use validation feedbacks',
};

export function getComponentStyleImports(props: Props) {
  const basics = `@use '@swisspost/design-system-styles/basics.scss';`;
  const generateComponentLine = (name: string) =>
    `@use '@swisspost/design-system-styles/components/${name}.scss';`;
  const components = props.components.map(generateComponentLine).join('\n');

  const required = Object.keys(props?.required || {}).reduce(
    (acc: string, curr: string) =>
      `${acc}\n// ${requiredLabels[curr]}\n${generateComponentLine(curr)}`,
    '',
  );

  return `${basics}\n${components}\n${required}`;
}

export function getStyleImportText(props: Props): any {
  if (props.components.filter(c => c === 'lead').length > 0) {
    return `To import only the styles required for typography elements:`;
  }

  return `To import only the styles required for this component:`;
}
