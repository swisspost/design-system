declare global {
  namespace Cypress {
    interface Chainable {
      getComponent(component: string, id: string, story?: string): Chainable<JQuery<HTMLElement>>;
      getComponents(id: string, story: string, ...components: string[]): Chainable<void>;
      getSnapshots(story: string): Chainable<JQuery<HTMLElement>>;
      checkAriaExpanded(
        controlledElementSelector: string,
        isExpanded: 'true' | 'false',
      ): Chainable<void>;
      checkFormDataPropValue(
        $form: JQuery<HTMLElement>,
        key: string,
        value: string | number | boolean | File | null,
      ): Chainable<void>;
      getFocusableElements(): Chainable<HTMLElement[]>;
    }
  }
}

export {};
