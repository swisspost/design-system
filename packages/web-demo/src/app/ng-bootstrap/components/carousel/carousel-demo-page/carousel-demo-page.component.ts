import { Component, OnInit } from "@angular/core";
const carouselTemplate = require("!!raw-loader!../carousel-demo/carousel-demo.component.html")
  .default;
const lightCarouselTemplate = require("!!raw-loader!../carousel-light-demo/carousel-light-demo.component.html")
  .default;

@Component({
  selector: "app-ngb-carousel-demo-page",
  templateUrl: "./carousel-demo-page.component.html",
})
export class NgbCarouselDemoPageComponent {
  carouselTemplate = carouselTemplate;
  lightCarouselTemplate = lightCarouselTemplate;
}
