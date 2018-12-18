import { CircuitTable } from '../tables/circuit-table';
import { ConstructorTable } from '../tables/constructor-table';
import { DriverTable } from '../tables/driver-table';
import { RaceTable } from '../tables/race-table';
import { SeasonTable } from '../tables/season-table';
import { StandingsTable } from '../tables/standings-table';

export class MRData {
  xmlns: string;
  series: string;
  url: string;
  limit: number;
  offset: number;
  total: number;

  RaceTable: RaceTable;

  SeasonTable: SeasonTable;

  DriverTable: DriverTable;
  ConstructorTable: ConstructorTable;

  StandingsTable: StandingsTable;

  CircuitTable: CircuitTable;
}
