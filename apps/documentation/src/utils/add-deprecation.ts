
import postComponentsDocJson from '@swisspost/design-system-components/dist/docs.json';
import internetHeaderDocJson from '@swisspost/internet-header/dist/docs.json';

const allComponents = [
  ...postComponentsDocJson.components,
  ...internetHeaderDocJson.components,
];

export function addDeprecation(componentTag: string, propName: string, deprecationMessage: string) {
  const deprecation = `<span className="mb-micro alert alert-warning alert-sm">**Deprecated:** ${deprecationMessage}</span>`;

  const component = allComponents.find(c => c.tag === componentTag);
  if (!component) return deprecation;

  const tag = [...component.props, ...component.methods].find(t => t.name === propName);
  if (!tag) return deprecation;

  return `${deprecation}${tag.docs}`;
}
