import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  private devs = [
    {
      name: 'Philipp Gfeller',
      title: 'Lead UI Developer',
      avatar: 'https://avatars.githubusercontent.com/u/1659006?v=4',
    },
    {
      name: 'Alizé Debray',
      title: 'UI Developer',
      avatar: 'https://avatars.githubusercontent.com/u/33580481?v=4',
    },
    {
      name: 'Oliver Schürch',
      title: 'UI Developer',
      avatar: 'https://avatars.githubusercontent.com/u/9716662?v=4',
    },
  ];

  public shuffledDevs;

  constructor() {
    this.shuffledDevs = this.shuffleDevs();
  }

  shuffleDevs() {
    return this.devs.sort(() => (Math.random() > 0.5 ? 1 : -1));
  }
}
