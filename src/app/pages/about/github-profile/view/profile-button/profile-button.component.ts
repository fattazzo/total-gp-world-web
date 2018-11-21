import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'profile-button',
  templateUrl: './profile-button.component.html',
  styleUrls: ['./profile-button.component.scss'],
})
export class ProfileButtonComponent implements OnInit {
  @Input()
  icon: string;

  @Input()
  title: string;

  @Input()
  url: string;

  @Input()
  brandClass = 'default';

  constructor() {}

  ngOnInit() {}
}
