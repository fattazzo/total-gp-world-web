import {
  Component,
  OnInit,
  OnDestroy,
  EventEmitter,
  Output,
} from '@angular/core';
import { StandingsModel } from './models/standings-model';
import { SearchType } from './models/search-type';
import { CapitalizePipe } from '../../../../@theme/pipes/capitalize.pipe';
import { TranslateService } from '@ngx-translate/core';
import { AppSettingsService } from '../../../../services/app-settings.service';
import { RacesService } from '../../../../services/races.service';
import { Observable } from 'rxjs/Observable';
import { Driver } from '../../../../domain/driver';
import { ConstructorsService } from '../../../../services/constructors.service';
import { DriversService } from '../../../../services/drivers.service';
import { Constructor } from '../../../../domain/constructor';
import { QueryBuilder } from './query-builder/query-builder';
import { of } from 'rxjs';

@Component({
  selector: 'query-standings',
  templateUrl: './standings.component.html',
  styleUrls: ['./standings.component.scss'],
})
export class StandingsComponent implements OnInit, OnDestroy {
  model: StandingsModel = new StandingsModel();

  types: any;
  seasons: any;
  rounds: any;
  driverStandings: any;
  drivers: any;
  constructorStandings: any;
  constructors: any;
  resultsPerPage: any;

  langSubscribe: any;

  roundsDisable = false;
  driversDisable = false;
  constructorDisable = false;

  @Output() resultsUrlChange: EventEmitter<string> = new EventEmitter();

  private queryBuilder = new QueryBuilder();

  constructor(
    private driversService: DriversService,
    private constructorsService: ConstructorsService,
    private racesService: RacesService,
    private translate: TranslateService,
    public appSettings: AppSettingsService,
  ) {
    this.langSubscribe = this.translate.onLangChange.subscribe(event => {
      this.loadTypes();
    });
  }

  ngOnInit() {
    this.onTypeChange();
    this.loadTypes();
    this.seasons = generateArray(2018, 1950, true, false);
    this.loadRounds();

    this.loadDrivers();
    this.loadConstructors();

    this.driverStandings = generateArray(1, 108);
    this.constructorStandings = generateArray(1, 22);

    this.resultsPerPage = [
      { value: 10, label: 10 },
      { value: 20, label: 20 },
      { value: 30, label: 30 },
      { value: 50, label: 50 },
      { value: 100, label: 100 },
    ];
  }

  ngOnDestroy(): void {
    this.langSubscribe.unsubscribe();
  }

  newModel() {
    this.model = new StandingsModel();
    this.onTypeChange();
    this.resultsUrlChange.emit('');
  }

  onSubmit() {
    this.resultsUrlChange.emit(this.queryBuilder.buildUrl(this.model));
  }

  onTypeChange() {
    this.driversDisable =
      this.model.type === SearchType.KEY_CONSTRUCTOR_STANDINGS ||
      this.model.type === SearchType.KEY_CONSTRUCTOR_INFORMATION;
    this.constructorDisable =
      this.model.type === SearchType.KEY_DRIVER_STANDINGS ||
      this.model.type === SearchType.KEY_DRIVER_INFORMATION;
  }

  onSeasonChange(value: any) {
    this.loadRounds();
    this.loadDrivers();
    this.loadConstructors();
  }

  private loadTypes() {
    const capitalizePipe = new CapitalizePipe();
    this.types = SearchType.getRsultsSearchTypes().map(t => ({
      value: t.key,
      label: capitalizePipe.transform(this.translate.instant(`type.${t.key}`)),
    }));
  }

  private loadRounds() {
    this.model.round = null;
    this.roundsDisable = true;

    if (!this.model.season) {
      this.rounds = generateArray(1, 30);
    } else {
      this.racesService.getSchedule(`${this.model.season}`, false).subscribe(
        sc => {
          const nrRounds = Math.max(1, sc.length);
          this.rounds = generateArray(1, nrRounds);
        },
        error => {
          this.rounds = generateArray(1, 30);
        },
      );
      this.roundsDisable = false;
    }
  }

  private loadDrivers() {
    let driversObs: Observable<Driver[]> = of([]);

    if (!this.driversDisable) {
      if (!this.model.season) {
        driversObs = this.driversService.getAll();
      } else {
        driversObs = this.driversService.get(`${this.model.season}`, false);
      }
    }

    this.model.driverId = null;
    driversObs.subscribe(
      dr => {
        this.drivers = dr
          .sort((d1, d2) =>
            `${d1.givenName} ${d1.familyName}` >
            `${d2.givenName} ${d2.familyName}`
              ? 1
              : -1,
          )
          .map(d => ({
            value: d.driverId,
            label: `${d.givenName} ${d.familyName}`,
          }));
        this.drivers.unshift({ value: null, label: '' });
      },
      error => {
        this.drivers = [];
      },
    );
  }

  private loadConstructors() {
    let constructorsObs: Observable<Constructor[]> = of([]);

    if (!this.constructorDisable) {
      if (!this.model.season) {
        constructorsObs = this.constructorsService.getAll();
      } else {
        constructorsObs = this.constructorsService.get(
          `${this.model.season}`,
          false,
        );
      }
    }

    this.model.constructorId = null;
    constructorsObs.subscribe(
      cs => {
        this.constructors = cs
          .sort((c1, c2) => (c1.name > c2.name ? 1 : -1))
          .map(c => ({
            value: c.constructorId,
            label: c.name,
          }));
        this.constructors.unshift({ value: null, label: '' });
      },
      error => {
        this.constructors = [];
      },
    );
  }
}

function generateArray(
  start: number,
  end: number,
  addAll: boolean = true,
  asc: boolean = true,
) {
  const array = asc
    ? Array.from({ length: end - start + 1 }, (v, k) => ({
        value: k + start,
        label: `${k + start}`,
      }))
    : Array.from({ length: start + 1 - end }, (v, k) => ({
        value: start - k,
        label: `${start - k}`,
      }));
  if (addAll) {
    array.unshift({ value: null, label: '' });
  }
  return array;
}
