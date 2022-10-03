import { Component } from '@angular/core';
const PostCardProductNavigationHtml =
  require('!!raw-loader!../post-card-product-navigation/post-card-product-navigation.component.html').default;
const PostCardProductTeaserHtml =
  require('!!raw-loader!../post-card-product-teaser/post-card-product-teaser.component.html').default;
const PostCardProductTeaserTs =
  require('!!raw-loader!../post-card-product-teaser/post-card-product-teaser.component.ts').default;
const PostCardButtonHtml =
  require('!!raw-loader!../post-card-button/post-card-button.component.html').default;

@Component({
  selector: 'app-cards-demo-page',
  templateUrl: './post-cards-demo-page.component.html',
})
export class PostCardsDemoPageComponent {
  postCardProductNavigationHtml = PostCardProductNavigationHtml;
  postCardProductTeaserHtml = PostCardProductTeaserHtml;
  postCardButtonHtml = PostCardButtonHtml;
  postCardProductTeaserTs = PostCardProductTeaserTs;
}
