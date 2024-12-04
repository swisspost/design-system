import { Component } from '@angular/core';

const CODE_TEMPLATE_REG =
  require('!!raw-loader!./components/intranet-header-demo-regular/intranet-header-demo-regular.component.html').default;
const CODE_TEMPLATE_SMALL =
  require('!!raw-loader!./components/intranet-header-demo-small-sidebar/intranet-header-demo-small-sidebar.component.html').default;
const CODE_TEMPLATE_BIG =
  require('!!raw-loader!./components/intranet-header-demo-big-sidebar/intranet-header-demo-big-sidebar.component.html').default;
const CODE_TEMPLATE_COND =
  require('!!raw-loader!./components/intranet-header-demo-condensed/intranet-header-demo-condensed.component.html').default;

@Component({
  selector: 'app-intranet-layout',
  templateUrl: 'intranet-layout.component.html',
  styleUrls: ['intranet-layout.component.css'],
})
export class IntranetLayoutComponent {
  codeModule = `// Other imports ....
  import { SwissPostIntranetHeaderModule } from '@swisspost/design-system-intranet-header';

  @NgModule({
    declarations: [
      // ...
    ],
    imports: [
      // ...
      SwissPostIntranetHeaderModule,
    ],
    // ...
  })
  export class AppModule {}`;
  codeTemplateSmall = CODE_TEMPLATE_SMALL;
  codeTemplateBig = CODE_TEMPLATE_BIG;
  codeTemplateReg = CODE_TEMPLATE_REG;
  codeTemplateCond = CODE_TEMPLATE_COND;
}
