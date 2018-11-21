import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'project-button',
  templateUrl: './project-button.component.html',
  styleUrls: ['./project-button.component.scss'],
})
export class ProjectButtonComponent {
  @Input()
  type: string;

  @Input()
  icon: string;

  @Input()
  title: string;

  @Input()
  url: string;

  constructor() {}
}
