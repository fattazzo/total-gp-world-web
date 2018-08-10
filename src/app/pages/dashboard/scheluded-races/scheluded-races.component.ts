import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Race } from '../../../domain/race';
import { RacesService } from '../../../services/races.service';
import { SeasonsService } from '../../../services/seasons.service';
import { Configuration } from '../../../app.constants';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'scheluded-races',
  templateUrl: './scheluded-races.component.html',
  styleUrls: ['./scheluded-races.component.scss']
})
export class ScheludedRacesComponent implements OnInit {

  schedule: Observable<Race[]>;

  columns = [
    { columnDef: 'round', header: 'Round', cell: (race: Race) => `${race.round}` },
    { columnDef: 'raceName', header: 'Name', cell: (race: Race) => `${race.raceName}` },
    { columnDef: 'date', header: 'Date', cell: (race: Race) => `${race.date}` },
    { columnDef: 'time', header: 'Time', cell: (race: Race) => `${race.time}` },
    { columnDef: 'country', header: 'Country', cell: (race: Race) => `${race.Circuit.Location.country}` },
    { columnDef: 'locality', header: 'Locality', cell: (race: Race) => `${race.Circuit.Location.locality}` },
  ];

  displayedColumns = this.columns.map(c => c.columnDef);

  constructor(private racesService: RacesService, private seasonsService: SeasonsService, private config: Configuration) { }

  ngOnInit() {
    this.seasonsService.getSeason().subscribe((newSeason) => {
      this.schedule = this.racesService.getSchedule(newSeason)
    });
  }

}
