import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { FooterComponent } from './footer/footer.component';
import { FormatCodePipe } from './format-code.pipe';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  declarations: [
    FooterComponent,
    FormatCodePipe,
  ],
  exports: [
    FooterComponent,
    FormatCodePipe
  ]
})
export class PostCommonModule { }
