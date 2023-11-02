import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DependencyLinkComponent } from './dependency-link/dependency-link.component';

import { FooterComponent } from './footer/footer.component';
import { FormatCodePipe } from './format-code.pipe';

@NgModule({
  imports: [CommonModule, RouterModule, FormsModule],
  declarations: [FooterComponent, FormatCodePipe, DependencyLinkComponent],
  exports: [FooterComponent, FormatCodePipe, DependencyLinkComponent],
})
export class PostCommonModule {}
