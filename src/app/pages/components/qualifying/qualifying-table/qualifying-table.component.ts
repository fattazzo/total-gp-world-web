import { Component, OnInit, Input } from '@angular/core';
import { Race } from '../../../../domain/race';
import { RaceQualifyingTable } from './domain/race-qualifying-table';

@Component({
  selector: 'qualifying-table',
  templateUrl: './qualifying-table.component.html',
  styleUrls: ['./qualifying-table.component.scss']
})
export class QualifyingTableComponent implements OnInit {

  racesResults: RaceQualifyingTable[];
  multipleResults: boolean = false;

  cols: any[];

  constructor() { }

  ngOnInit() {
    this.buildColumns();
  }

  @Input('results')
  set results(results: Race[]) {
    this.racesResults = [];
    this.multipleResults = false

    results.forEach(race =>
      race.QualifyingResults.forEach((result, index) => {
        this.racesResults.push(new RaceQualifyingTable(race.raceName, race.Circuit, result));
        this.multipleResults = this.multipleResults || (index > 0);
      })
    )

    this.buildColumns();
  }

  private buildColumns() {
    this.cols = [];

    if (this.multipleResults) {
      this.cols.push({ field: 'driverName', key: 'driver.sing', cell: (race: RaceQualifyingTable) => `${race.driverName}` });
    }

    this.cols.push(
      { field: 'position', key: 'position.sing', cell: (race: RaceQualifyingTable) => `${race.result.position}` },
      { field: 'q1', key: 'Q1', cell: (race: RaceQualifyingTable) => `${race.q1}` },
      { field: 'q2', key: 'Q2', cell: (race: RaceQualifyingTable) => `${race.q2}` },
      { field: 'q3', key: 'Q3', cell: (race: RaceQualifyingTable) => `${race.q3}` }
    );
  }
}
