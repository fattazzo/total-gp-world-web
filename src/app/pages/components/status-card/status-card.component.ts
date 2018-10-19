import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-status-card',
  styleUrls: ['./status-card.component.scss'],
  template: `
    <nb-card>
      <div class="icon-container">
        <div class="icon {{ type }}">
          <ng-content></ng-content>
        </div>
      </div>
      <div class="details">
        <div class="title">{{ title | translate | ngxCapitalize }}</div>
      </div>
      <div class="icon-container">
        <div class="iconbox">
        <b>{{ value }}</b>
        </div>
      </div>
    </nb-card>
  `,
})
export class StatusCardComponent {
  @Input()
  title: string;
  @Input()
  type: string;
  @Input()
  on = true;
  @Input()
  value: string;
}
