# Contributing to Design System Migrations

Schematics are used to transform an Angular software project by adapting it to current Design System Styles.

### Testing

To test the Schematics without writing any changes to your files, install `@angular-devkit/schematics-cli` globally and use the `schematics` command line tool.<br>
That tool acts the same as the `generate` command of the Angular CLI, but also has a debug mode.

Run the following command in the project which uses this package as dependency:

```bash
schematics ./node_modules/@swisspost/design-system-migrations:migration-name
```

Replace `migration-name` with any defined migration in the migrations.json file or simply get some help with:

```bash
schematics --help
```
