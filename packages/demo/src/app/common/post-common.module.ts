import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DependencyLinkComponent } from './dependency-link/dependency-link.component';

import { FooterComponent } from './footer/footer.component';
import { FormatCodePipe } from './format-code.pipe';
import { NgbLocalizationComponent } from './ngb-localization/ngb-localization.component';
import { Highlight } from 'ngx-highlightjs';

@NgModule({
  imports: [CommonModule, RouterModule, FormsModule, Highlight],
  declarations: [
    FooterComponent,
    FormatCodePipe,
    DependencyLinkComponent,
    NgbLocalizationComponent,
  ],
  exports: [FooterComponent, FormatCodePipe, DependencyLinkComponent, NgbLocalizationComponent],
})
export class PostCommonModule {}
