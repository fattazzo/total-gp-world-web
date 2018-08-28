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
    { columnDef: 'round', header: 'Round', cell: (race: Race) => `${race.round}` },
    { columnDef: 'raceName', header: 'Name', cell: (race: Race) => `${race.raceName}` },
    { columnDef: 'date', header: 'Date', cell: (race: Race) => `${race.date}` },
    { columnDef: 'time', header: 'Time', cell: (race: Race) => `${race.time}` },
    { columnDef: 'country', header: 'Country', cell: (race: Race) => `${race.Circuit.Location.country}` },
    { columnDef: 'locality', header: 'Locality', cell: (race: Race) => `${race.Circuit.Location.locality}` },
  ];

  displayedColumns = this.columns.map(c => c.columnDef);

  constructor() { }

  ngOnInit() { }

}
