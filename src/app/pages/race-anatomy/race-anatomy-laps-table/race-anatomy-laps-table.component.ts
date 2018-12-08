import { Component, OnInit, Input } from '@angular/core';
import { Lap } from '../../../domain/lap';
import { DriversService } from '../../../services/drivers.service';
import { Driver } from '../../../domain/driver';

export interface LapItem {
  number: string;
  driver: string;
  driverId: string;
  position: string;
  time: string;
}

@Component({
  selector: 'race-anatomy-laps-table',
  templateUrl: './race-anatomy-laps-table.component.html',
  styleUrls: ['./race-anatomy-laps-table.component.scss'],
})
export class RaceAnatomyLapsTableComponent implements OnInit {
  @Input() season: string;

  lapsItems: LapItem[];
  rowGroupMetadata: any;

  constructor(private driversService: DriversService) {}

  ngOnInit() {}

  @Input('laps')
  set laps(values: Lap[]) {
    const driversMap = new Map();
    this.driversService.get(this.season).subscribe(drivers => {
      drivers.forEach(d => driversMap.set(d.driverId, d));
      this.buildLapsItems(values, driversMap);
    });
  }

  private buildLapsItems(values: Lap[], driversMap: Map<string, Driver>) {
    this.lapsItems = [];
    values.forEach(lap => {
      const number = lap.number;
      lap.Timings.forEach(t =>
        this.lapsItems.push({
          number: number,
          driver: `${driversMap.get(t.driverId).givenName} ${
            driversMap.get(t.driverId).familyName
          }`,
          driverId: t.driverId,
          position: t.position,
          time: t.time,
        }),
      );
    });
    this.updateRowGroupMetaData();
  }

  updateRowGroupMetaData() {
    this.rowGroupMetadata = {};
    if (this.lapsItems) {
      for (let i = 0; i < this.lapsItems.length; i++) {
        const rowData = this.lapsItems[i];
        const number = rowData.number;
        if (i === 0) {
          this.rowGroupMetadata[number] = { index: 0, size: 1 };
        } else {
          const previousRowData = this.lapsItems[i - 1];
          const previousRowGroup = previousRowData.number;
          if (number === previousRowGroup) this.rowGroupMetadata[number].size++;
          else this.rowGroupMetadata[number] = { index: i, size: 1 };
        }
      }
    }
  }
}
