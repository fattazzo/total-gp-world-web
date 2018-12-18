import { Component, OnInit, Output, EventEmitter } from '@angular/core';
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

@Component({
  selector: 'query-race-results',
  templateUrl: './race-results.component.html',
  styleUrls: ['./race-results.component.scss'],
})
export class RaceResultsComponent implements OnInit {
  model: RaceResultsModel = new RaceResultsModel();

  types: any;
  seasons: any;
  rounds: any;
  drivers: any;
  constructors: any;
  circuits: any;
  resultsPerPage: any;

  @Output() resultsUrlChange: EventEmitter<string> = new EventEmitter();

  private queryBuilder = new QueryBuilder();

  constructor(
    private driversService: DriversService,
    private constructorsService: ConstructorsService,
    private circuitsService: CircuitsService,
    private translate: TranslateService,
  ) {}

  ngOnInit() {
    const capitalizePipe = new CapitalizePipe();
    this.types = SearchType.getRsultsSearchTypes().map(t => ({
      value: t.key,
      label: capitalizePipe.transform(this.translate.instant(`type.${t.key}`)),
    }));
    this.seasons = generateArray(2018, 1950, true, false);
    this.rounds = generateArray(1, 30);
    this.driversService.getAll().subscribe(dr => {
      this.drivers = dr.map(d => ({
        value: d.driverId,
        label: `${d.givenName} ${d.familyName}`,
      }));
      this.drivers.unshift({ value: null, label: '' });
    });
    this.constructorsService.getAll().subscribe(cs => {
      this.constructors = cs.map(c => ({
        value: c.constructorId,
        label: c.name,
      }));
      this.constructors.unshift({ value: null, label: '' });
    });
    this.circuitsService.getAll().subscribe(cs => {
      this.circuits = cs.map(c => ({
        value: c.circuitId,
        label: c.circuitName,
      }));
      this.circuits.unshift({ value: null, label: '' });
    });
    this.resultsPerPage = [
      { value: 10, label: 10 },
      { value: 20, label: 20 },
      { value: 30, label: 30 },
      { value: 50, label: 50 },
      { value: 100, label: 100 },
    ];
  }

  newModel() {
    this.model = new RaceResultsModel();
    this.resultsUrlChange.emit('');
  }

  onSubmit() {
    this.resultsUrlChange.emit(this.queryBuilder.buildUrl(this.model));
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
