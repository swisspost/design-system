import { Rule } from '@angular-devkit/schematics';
import type { AnyNode, Cheerio, CheerioAPI } from 'cheerio';
import { DomUpdate, getDomMigrationRule } from '../../../utils/dom-migration';

export default function (): Rule {
  return getDomMigrationRule(
    new StepperContainerUpdate,
    new StepperBarUpdate,
    new StepperUpdate,
    new StepperLinkUpdate,
  );
}

// replace the aria-label of the stepper containers with a hidden heading
class StepperContainerUpdate implements DomUpdate {
  selector = '.stepper-container';

  update($stepperContainers: Cheerio<AnyNode>, $: CheerioAPI) {
    $stepperContainers
      .each((_i, stepperContainer) => {
        const $stepperContainer = $(stepperContainer);

        const simpleAriaLabel = $stepperContainer.attr('aria-label');
        if (simpleAriaLabel) {
          $stepperContainer.removeAttr('aria-label');
          $stepperContainer.prepend(`<h2 class="visually-hidden">${simpleAriaLabel}</h2>`)
        }

        const boundAriaLabel = $stepperContainer.attr('[attr.aria-label]');
        if (boundAriaLabel) {
          $stepperContainer.removeAttr('[attr.aria-label]');
          $stepperContainer.prepend(`<h2 class="visually-hidden">{{ ${boundAriaLabel} }}</h2>`)
        }
      });
  }
}

// make the stepper bars aria-hidden and remove their type attribute
class StepperBarUpdate implements DomUpdate {
  selector = '.stepper-bar';

  update($stepperBars: Cheerio<AnyNode>) {
    $stepperBars
      .attr('aria-hidden', 'true')
      .removeAttr('type');
  }
}

// add a list role to the steppers
class StepperUpdate implements DomUpdate {
  selector = '.stepper';

  update($stepper: Cheerio<AnyNode>) {
    $stepper.attr('role', 'list');
  }
}

// remove the tabindex on stepper links
class StepperLinkUpdate implements DomUpdate {
  selector = '.stepper-link';

  update($stepperBars: Cheerio<AnyNode>) {
    $stepperBars
      .removeAttr('tabindex')
      .removeAttr('[attr.tabindex]');
  }
}
