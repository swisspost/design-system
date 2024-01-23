import { Rule } from '@angular-devkit/schematics';
import type { AnyNode, Cheerio, CheerioAPI } from 'cheerio';
import { randomUUID } from 'crypto';
import { formControlProperties, formControlReferences } from '../../../utils/constants';
import { DomUpdate, getDomMigrationRule } from '../../../utils/dom-migration';

export default function (): Rule {
  return getDomMigrationRule(
    new NgbButtonGroupDeprecationUpdate,
  );
}

class NgbButtonGroupDeprecationUpdate implements DomUpdate {
  selector = '.btn-group';

  update($buttonGroups: Cheerio<AnyNode>, $: CheerioAPI) {
    $buttonGroups
      .each((_i, buttonGroup) => {
        const $buttonGroup = $(buttonGroup);

        const $labels = $buttonGroup
          .children('label')
          .filter((_i, label) => {
            return typeof $(label).attr('ngbButtonLabel') !== 'undefined';
          });

        // exit if the button group does not contain labels with a ngb directive
        if (!$labels.length) {
          return;
        }

        // if the button group is a radio group, remove the ngb radio directive
        let attributesToTransfer: { key: string, value: string }[];
        if (typeof $buttonGroup.attr('ngbRadioGroup') !== 'undefined') {
          $buttonGroup.removeAttr('ngbRadioGroup');

          // save the form control properties from the radio group
          attributesToTransfer = formControlProperties
            .map(prop => ({ key: prop, value: $buttonGroup.attr(prop) }))
            .filter((attr): attr is { key: string, value: string } => typeof attr.value !== 'undefined');

          // save the form control references from the radio group
          Object.entries($buttonGroup.attr() ?? {})
            .forEach(([ key, value ]) => {
              if (formControlReferences.includes(value)) {
                attributesToTransfer.push({ key, value });
              }
            });

          // remove the form control properties and references from the radio group
          attributesToTransfer.forEach(attr => {
            $buttonGroup.removeAttr(attr.key);
          });
        }

        $labels.each((_j, label) => {
          const $label = $(label);
          const $input = $label.children('input').first();

          // remove the ngb directives
          $label.removeAttr('ngbButtonLabel');
          $input.removeAttr('ngbButton');

          // bind the input with its label via an id
          let inputId = $input.attr('id');
          if (!inputId) {
            inputId = randomUUID();
            $input.attr('id', inputId);
          }
          $label.attr('for', inputId);

          // transfer attributes from parent
          attributesToTransfer
            .forEach(attr => {
              $input.attr(attr.key, attr.value);
            });

          // if the label uses an ngFor directive, move it to a ng-container wrapper
          const ngFor = $label.attr('*ngFor');
          if (ngFor) {
            const $container = $(`<ng-container *ngFor="${ngFor}"></ng-container>`);
            $label.wrap($container);
            $label.removeAttr('*ngFor');
          }

          // move the input before its label
          $label.before($input);
        });
      });
  }
}
