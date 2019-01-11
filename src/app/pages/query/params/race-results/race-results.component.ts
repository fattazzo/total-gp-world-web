import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { RaceResultsModel } from './models/race-results-model';
import { DriversService } from '../../../../services/drivers.service';
import { Observable } from 'rxjs';
import { Driver } from '../../../../domain/driver';
import { ConstructorsService } from '../../../../services/constructors.service';
import { CircuitsService } from '../../../../services/circuits.service';
import { QueryBuilder } from '../query-builder/query-builder';
import { SearchType } from './models/search-type';
import { TranslateService } from '@ngx-translate/core';
import { CapitalizePipe } from '../../../../@theme/pipes/capitalize.pipe';
import { NbThemeService } from '@nebular/theme';
import { AppSettingsService } from '../../../../services/app-settings.service';
import { Constructor } from '../../../../domain/constructor';
import { Circuit } from '../../../../domain/circuit';
import { RacesService } from '../../../../services/races.service';

@Component({
  selector: 'query-race-results',
  templateUrl: './race-results.component.html',
  styleUrls: ['./race-results.component.scss'],
})
export class RaceResultsComponent implements OnInit, OnDestroy {
  model: RaceResultsModel = new RaceResultsModel();

  types: any;
  seasons: any;
  rounds: any;
  drivers: any;
  constructors: any;
  circuits: any;
  resultsPerPage: any;

  langSubscribe: any;

  @Output() resultsUrlChange: EventEmitter<string> = new EventEmitter();

  private queryBuilder = new QueryBuilder();

  constructor(
    private driversService: DriversService,
    private constructorsService: ConstructorsService,
    private circuitsService: CircuitsService,
    private racesService: RacesService,
    private translate: TranslateService,
    public appSettings: AppSettingsService,
  ) {
    this.langSubscribe = this.translate.onLangChange.subscribe(event => {
      this.loadTypes();
    });
  }

  ngOnDestroy(): void {
    this.langSubscribe.unsubscribe();
  }

  ngOnInit() {
    this.loadTypes();
    this.seasons = generateArray(2018, 1950, true, false);
    this.loadRounds();

    this.loadDrivers();
    this.loadConstructors();
    this.loadCircuits();

    this.resultsPerPage = [
      { value: 10, label: 10 },
      { value: 20, label: 20 },
      { value: 30, label: 30 },
      { value: 50, label: 50 },
      { value: 100, label: 100 },
    ];
  }

  private loadTypes() {
    const capitalizePipe = new CapitalizePipe();
    this.types = SearchType.getRsultsSearchTypes().map(t => ({
      value: t.key,
      label: capitalizePipe.transform(this.translate.instant(`type.${t.key}`)),
    }));
  }

  newModel() {
    this.model = new RaceResultsModel();
    this.resultsUrlChange.emit('');
  }

  onSubmit() {
    this.resultsUrlChange.emit(this.queryBuilder.buildUrl(this.model));
  }

  onSeasonChange(value: any) {
    this.loadRounds();
    this.loadDrivers();
    this.loadConstructors();
    this.loadCircuits();
  }

  private loadDrivers() {
    let driversObs: Observable<Driver[]>;
    if (!this.model.season) {
      driversObs = this.driversService.getAll();
    } else {
      driversObs = this.driversService.get(`${this.model.season}`, false);
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
    let constructorsObs: Observable<Constructor[]>;
    if (!this.model.season) {
      constructorsObs = this.constructorsService.getAll();
    } else {
      constructorsObs = this.constructorsService.get(
        `${this.model.season}`,
        false,
      );
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

  private loadCircuits() {
    let circuitsObs: Observable<Circuit[]>;
    if (!this.model.season) {
      circuitsObs = this.circuitsService.getAll();
    } else {
      circuitsObs = this.circuitsService.get(`${this.model.season}`, false);
    }

    this.model.circuitId = null;
    circuitsObs.subscribe(
      cs => {
        this.circuits = cs
          .sort((c1, c2) => (c1.circuitName > c2.circuitName ? 1 : -1))
          .map(c => ({
            value: c.circuitId,
            label: c.circuitName,
          }));
        this.circuits.unshift({ value: null, label: '' });
      },
      error => {
        this.circuits = [];
      },
    );
  }

  private loadRounds() {
    this.model.round = null;

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
    }
  }
}

function generateArray(
  start: number,
  end: number,
  addAll: boolean = true,
  asc: boolean = true,
) {
  const array = asc
    ? Array.from({ length: end - start }, (v, k) => ({
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
