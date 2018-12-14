import { Component, OnInit, Input } from '@angular/core';
import { Result } from '../../../domain/result';

@Component({
  selector: 'race-anatomy-results',
  templateUrl: './race-anatomy-results.component.html',
  styleUrls: ['./race-anatomy-results.component.scss'],
})
export class RaceAnatomyResultsComponent implements OnInit {
  @Input() season: string;

  @Input() results: Result[];

  cols: any[];

  constructor() {}

  ngOnInit() {
    this.cols = [
      'position.sing',
      'number.sing',
      'driver.sing',
      'constructor.sing',
      'lap.plur',
      'time.sing',
      'status.sing',
      'point.plur',
    ];
  }
}
