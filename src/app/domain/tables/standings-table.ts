import { DriverStanding } from '../driver-standing';
import { ConstructorStanding } from '../constructor-standing';
import { BaseTable } from './base-table';

export class StandingsLists {
  season: string;
  round: string;
  DriverStandings: DriverStanding[];
  ConstructorStandings: ConstructorStanding[];
}

export class StandingsTable extends BaseTable {
  StandingsLists: StandingsLists[];
}
