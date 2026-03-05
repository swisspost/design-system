import { Component } from '@angular/core';
import { SwissPostIntranetHeaderComponent } from '@swisspost/design-system-intranet-header';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'post-default-navigation',
  imports: [RouterLink, SwissPostIntranetHeaderComponent],
  templateUrl: './default-navigation.html',
  styleUrl: './default-navigation.scss',
})
export class DefaultNavigation {
  count = 0;
}
