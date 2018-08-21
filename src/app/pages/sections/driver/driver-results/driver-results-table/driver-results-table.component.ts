import { Component, OnInit, Input } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Race } from '../../../../../domain/race';
import { DriversService } from '../../../../../services/drivers.service';

@Component({
  selector: 'driver-results-table',
  templateUrl: './driver-results-table.component.html',
  styleUrls: ['./driver-results-table.component.scss']
})
export class DriverResultsTableComponent {

  @Input() results: Race[];

  columns = [
    { columnDef: 'raceName', header: 'Race', cell: (race: Race) => `${race.raceName}` },
    { columnDef: 'position', header: 'Position', cell: (race: Race) => `${race.Results[0].positionText}` },
    { columnDef: 'laps', header: 'Laps', cell: (race: Race) => `${race.Results[0].laps}` },
    { columnDef: 'grid', header: 'Grid', cell: (race: Race) => `${race.Results[0].grid}` },
    { columnDef: 'time', header: 'Time', cell: (race: Race) => race.Results[0].Time === undefined ? '' : race.Results[0].Time.time },
    { columnDef: 'status', header: 'Status', cell: (race: Race) => `${race.Results[0].status}` },
    { columnDef: 'points', header: 'Points', cell: (race: Race) => `${race.Results[0].points}` },
  ];

  displayedColumns = this.columns.map(c => c.columnDef);

  constructor() { }

}
