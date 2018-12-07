import { Component, OnInit, Input } from '@angular/core';

import { DriverStanding } from '../../../../domain/driver-standing';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'drivers-st-table',
  templateUrl: './drivers-st-table.component.html',
  styleUrls: ['./drivers-st-table.component.scss'],
})
export class DriversStTableComponent implements OnInit {
  @Input() standings: DriverStanding[];
  @Input() season: string;

  constructor(public translate: TranslateService) {}

  ngOnInit() {}
}
