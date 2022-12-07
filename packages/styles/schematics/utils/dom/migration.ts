import { Rule } from '@angular-devkit/schematics';
import DomUpdate from './update';
import DomMigrationRule from './migration-rule';

export default class DomMigration {
  updates: DomUpdate[];
  rule: Rule;

  constructor(...updates: DomUpdate[]) {
    this.updates = updates;
    this.rule = DomMigrationRule(this);
  }
}
