import { Component, OnInit, Input } from '@angular/core';
import { QualifyingResult } from '../../../domain/qualifying-result';

@Component({
  selector: 'race-anatomy-qualifying',
  templateUrl: './race-anatomy-qualifying.component.html',
  styleUrls: ['./race-anatomy-qualifying.component.scss'],
})
export class RaceAnatomyQualifyingComponent implements OnInit {
  @Input() season: string;

  @Input() qualifying: QualifyingResult[];

  constructor() {}

  ngOnInit() {}
}
