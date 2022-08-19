import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
const topicTeaserTemplate = require('!!raw-loader!../topic-teaser-demo/topic-teaser-demo.component.html').default
const topicTeaserRightTemplate = require('!!raw-loader!../topic-teaser-right-demo/topic-teaser-right-demo.component.html').default

@Component({
  selector: 'app-topic-teaser-demo-page',
  templateUrl: './topic-teaser-demo-page.component.html'
})
export class TopicTeaserDemoPageComponent{
  topicTeaserTemplate = topicTeaserTemplate;
  topicTeaserRightTemplate = topicTeaserRightTemplate;

  constructor(public router: Router) { }
}
