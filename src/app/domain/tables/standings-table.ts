import { DriverStanding } from '../driver-standing';
import { ConstructorStanding } from '../constructor-standing';

export class StandingsLists {
  season: string;
  round: string;
  DriverStandings: DriverStanding[];
  ConstructorStandings: ConstructorStanding[];
}

export class StandingsTable {
  StandingsLists: StandingsLists[];
}
