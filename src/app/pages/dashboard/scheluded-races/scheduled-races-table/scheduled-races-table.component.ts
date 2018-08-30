import { Component, OnInit, Input } from '@angular/core';
import { Race } from '../../../../domain/race';

@Component({
  selector: 'scheduled-races-table',
  templateUrl: './scheduled-races-table.component.html',
  styleUrls: ['./scheduled-races-table.component.scss']
})
export class ScheduledRacesTableComponent implements OnInit {

  @Input() schedule: Race[];
  @Input() season: string;

  columns = [
    { columnDef: 'round', key: 'round.sing', cell: (race: Race) => `${race.round}` },
    { columnDef: 'raceName', key: 'name.sing', cell: (race: Race) => `${race.raceName}` },
    { columnDef: 'date', key: 'date.sing', cell: (race: Race) => race.date === undefined ? '' : `${race.date.substr(8, 2)}-${race.date.substr(5, 2)}-${race.date.substr(0, 4)}` },
    { columnDef: 'time', key: 'time.sing', cell: (race: Race) => `${race.time}` },
    { columnDef: 'country', key: 'country.sing', cell: (race: Race) => `${race.Circuit.Location.country}` },
    { columnDef: 'locality', key: 'locality.sing', cell: (race: Race) => `${race.Circuit.Location.locality}` },
  ];

  displayedColumns = this.columns.map(c => c.columnDef);

  constructor() { }

  ngOnInit() { }

}
