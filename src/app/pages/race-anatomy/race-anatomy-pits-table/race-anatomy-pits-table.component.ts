import { Component, OnInit, Input } from '@angular/core';
import { PitStop } from '../../../domain/pitstop';
import { Driver } from '../../../domain/driver';
import { DriversService } from '../../../services/drivers.service';
import { Time } from '../../../domain/time';

export interface PitItem {
  driver: string;
  driverId: string;
  lap: string;
  stop: string;
  time: string;
  duration: string;
}

@Component({
  selector: 'race-anatomy-pits-table',
  templateUrl: './race-anatomy-pits-table.component.html',
  styleUrls: ['./race-anatomy-pits-table.component.scss'],
})
export class RaceAnatomyPitsTableComponent implements OnInit {
  @Input() season: string;

  pitStops: PitItem[];

  constructor(private driversService: DriversService) {}

  ngOnInit() {}

  @Input('pits')
  set pits(values: PitStop[]) {
    const driversMap = new Map();
    this.driversService.get(this.season).subscribe(drivers => {
      drivers.forEach(d => driversMap.set(d.driverId, d));
      this.buildPitItems(values, driversMap);
    });
  }

  private buildPitItems(values: PitStop[], driversMap: Map<string, Driver>) {
    this.pitStops = values.map(p => ({
      driver: `${driversMap.get(p.driverId).givenName} ${
        driversMap.get(p.driverId).familyName
      }`,
      driverId: p.driverId,
      lap: p.lap,
      stop: p.stop,
      time: p.time,
      duration: p.duration,
    }));
  }
}
