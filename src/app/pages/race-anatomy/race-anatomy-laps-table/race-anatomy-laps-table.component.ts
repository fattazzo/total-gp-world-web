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

  totalLapsItems: LapItem[];
  pageLapsItems: LapItem[];

  rowsPerPage = 1;
  totalRecords = 0;

  loading = false;

  constructor(private driversService: DriversService) {}

  ngOnInit() {}

  @Input('laps')
  set laps(values: Lap[]) {
    const driversMap = new Map();
    this.driversService.get(this.season).subscribe(drivers => {
      drivers.forEach(d => driversMap.set(d.driverId, d));
      this.rowsPerPage = driversMap.size;
      this.buildLapsItems(values, driversMap);
    });
  }

  private buildLapsItems(values: Lap[], driversMap: Map<string, Driver>) {
    this.totalLapsItems = [];
    this.pageLapsItems = [];
    values.forEach(lap => {
      const number = lap.number;
      lap.Timings.forEach(t =>
        this.totalLapsItems.push({
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
    this.totalRecords = this.rowsPerPage * values.length;
  }

  loadLapsLazy(event: any) {
    setTimeout(
      () =>
        (this.pageLapsItems = this.totalLapsItems.filter(
          l => l.number === `${(event.first + event.rows) / this.rowsPerPage}`,
        )),
      0,
    );
  }
}
