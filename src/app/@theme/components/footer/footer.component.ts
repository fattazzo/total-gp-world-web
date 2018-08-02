import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by">Created by <b>Fattazzo</b> 2018</span>
    <div class="socials">
      <a href="https://github.com/fattazzo" target="_blank" class="ion ion-social-github"></a>
      <a href="https://www.facebook.com/Fattazzo" target="_blank" class="ion ion-social-facebook"></a>
      <a href="https://plus.google.com/+GianlucaFattarsi" target="_blank" class="ion ion-social-googleplus"></a>
      <a href="https://www.linkedin.com/in/gianluca-fattarsi" target="_blank" class="ion ion-social-linkedin"></a>
    </div>
  `,
})
export class FooterComponent {
}
