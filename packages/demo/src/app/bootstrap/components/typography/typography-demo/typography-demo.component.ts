import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-typography-demo',
  templateUrl: './typography-demo.component.html',
})
export class TypographyDemoComponent {
  @Input() isContinuous: boolean = false;
  externalParagraph = `<article class="light font-curve-regular">
  <p class="lead">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Animi voluptatibus laborum atque explicabo consequuntur esse, ab debitis facere obcaecati aperiam suscipit officiis ut amet quasi optio porro odit maxime placeat.</p>
  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut iste pariatur laboriosam possimus suscipit, ullam nemo, laborum minima itaque sed obcaecati. Neque officia, non similique eius repudiandae sequi totam nihil?</p>
</article>`;
  internalParagraph = `<p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Animi voluptatibus laborum atque explicabo consequuntur esse, ab debitis facere obcaecati aperiam suscipit officiis ut amet quasi optio porro odit maxime placeat.</p>
<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut iste pariatur laboriosam possimus suscipit, ullam nemo, laborum minima itaque sed obcaecati. Neque officia, non similique eius repudiandae sequi totam nihil?</p>
<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut iste pariatur laboriosam possimus suscipit, ullam nemo, laborum minima itaque sed obcaecati. Neque officia, non similique eius repudiandae sequi totam nihil?</p>`;
}
