import { Component } from '@angular/core';
const codeTemplateSmall =
  require('!!raw-loader!./components/intranet-header-small/intranet-header-small.component.html').default;
const codeTemplateBig =
  require('!!raw-loader!./components/intranet-header-big/intranet-header-big.component.html').default;

@Component({
  selector: 'app-intranet-layout',
  templateUrl: 'intranet-layout.component.html',
  styleUrls: ['intranet-layout.component.css'],
})
export class IntranetLayoutComponent {
  codeTemplateSmall = codeTemplateSmall;
  codeTemplateBig = codeTemplateBig;
  codeTemplateReg = `<sp-intranet-header siteTitle="SiteTitle" isPreview="true" languages="de,fr,it">
      <li class="nav-item"><a class="nav-link" href="#">Testlink</a></li>
      <li class="nav-item"><a class="nav-link" href="#">Testlink</a></li>
      <li class="nav-item" ngbDropdown>
            <span class="nav-link" id="testid01" href="#" ngbDropdownToggle>Dropdown</span>
            <div class="dropdown-menu" aria-labelledby="testid01" ngbDropdownMenu>
                  <a class="dropdown-item" href="#" ngbDropdownItem>Link 1</a>
                  <a class="dropdown-item" href="#" ngbDropdownItem>Link 2</a>
                  <a class="dropdown-item" href="#" ngbDropdownItem>Link 3</a>
            </div>
      </li>
      <li class="nav-item"><a class="nav-link" href="#">Testlink</a></li>
</sp-intranet-header>`;
}
