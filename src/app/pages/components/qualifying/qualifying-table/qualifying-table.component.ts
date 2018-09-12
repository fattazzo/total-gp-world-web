import { Component, OnInit, Input } from '@angular/core';
import { Race } from '../../../../domain/race';

@Component({
  selector: 'qualifying-table',
  templateUrl: './qualifying-table.component.html',
  styleUrls: ['./qualifying-table.component.scss']
})
export class QualifyingTableComponent {

  @Input() results: Race[];

  columns = [
    { columnDef: 'raceName', header: 'Race', cell: (race: Race) => `${race.raceName}` },
    { columnDef: 'position', header: 'Position', cell: (race: Race) => `${race.QualifyingResults[0].position}` },
    { columnDef: 'Q1', header: 'Q1', cell: (race: Race) => race.QualifyingResults[0].Q1 === undefined ? '' : `${race.QualifyingResults[0].Q1}` },
    { columnDef: 'Q2', header: 'Q2', cell: (race: Race) => race.QualifyingResults[0].Q2 === undefined ? '' : `${race.QualifyingResults[0].Q2}` },
    { columnDef: 'Q3', header: 'Q3', cell: (race: Race) => race.QualifyingResults[0].Q3 === undefined ? '' : `${race.QualifyingResults[0].Q3}` },
  ];

  displayedColumns = this.columns.map(c => c.columnDef);

  constructor() { }

}
