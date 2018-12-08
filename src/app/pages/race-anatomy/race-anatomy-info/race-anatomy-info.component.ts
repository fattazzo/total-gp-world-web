import { Component, OnInit, Input } from '@angular/core';
import { Race } from '../../../domain/race';

@Component({
  selector: 'race-anatomy-info',
  templateUrl: './race-anatomy-info.component.html',
  styleUrls: ['./race-anatomy-info.component.scss'],
})
export class RaceAnatomyInfoComponent implements OnInit {
  races: Race[] = [];

  constructor() {}

  ngOnInit() {}

  @Input('race')
  set race(value: Race) {
    this.races = [];

    if (value) {
      this.races.push(value);
    }
  }
}
