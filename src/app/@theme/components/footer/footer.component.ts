import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by"
      ><b>Fattazzo</b> 2018 -
      <a [routerLink]="['/pages/policy']" class="link-black"
        >Informativa privacy - Informativa cookie</a
      ></span
    >
    <div class="socials">
      <a
        href="https://play.google.com/store/apps/details?id=com.gmail.fattazzo.formula1world"
        target="_blank"
        class="ion ion-logo-android"
      ></a>
      <a
        href="https://github.com/fattazzo"
        target="_blank"
        class="ion ion-logo-github"
      ></a>
      <a
        href="https://www.facebook.com/Fattazzo"
        target="_blank"
        class="ion ion-logo-facebook"
      ></a>
      <a
        href="https://plus.google.com/+GianlucaFattarsi"
        target="_blank"
        class="ion ion-logo-googleplus"
      ></a>
      <a
        href="https://www.linkedin.com/in/gianluca-fattarsi"
        target="_blank"
        class="ion ion-logo-linkedin"
      ></a>
    </div>
  `,
})
export class FooterComponent {}
