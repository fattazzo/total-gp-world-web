import { Race } from "../race";
import { RaceTable } from "../tables/race-table";
import { SeasonTable } from "../tables/season-table";
import { DriverTable } from "../tables/driver-table";
import { StandingsTable } from "../tables/standings-table";
import { ConstructorTable } from "../tables/constructor-table";

export class MRData {
    xmlns: string;
    series: string;
    url: string;
    limit: string;
    offset: string;
    total: string;

    RaceTable: RaceTable;

    SeasonTable: SeasonTable;

    DriverTable: DriverTable;
    ConstructorTable: ConstructorTable;

    StandingsTable: StandingsTable;
}