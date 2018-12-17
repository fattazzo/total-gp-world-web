import { Component, OnInit } from '@angular/core';
import { RaceResultsModel } from './models/race-results-model';
import { DriversService } from '../../../../services/drivers.service';
import { Observable } from 'rxjs';
import { Driver } from '../../../../domain/driver';
import { ConstructorsService } from '../../../../services/constructors.service';
import { CircuitsService } from '../../../../services/circuits.service';

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

  constructor(
    private driversService: DriversService,
    private constructorsService: ConstructorsService,
    private circuitsService: CircuitsService,
  ) {}

  ngOnInit() {
    this.types = RaceResultsModel.searchTypes.map(t => ({
      value: t,
      label: t.key,
    }));
    this.seasons = generateArray(2018, 1950, true, false);
    this.rounds = generateArray(1, 30);
    this.driversService.getAll().subscribe(dr => {
      this.drivers = dr.map(d => ({
        value: d.driverId,
        label: `${d.givenName} ${d.familyName}`,
      }));
      this.drivers.unshift({ value: null, label: 'All' });
    });
    this.constructorsService.getAll().subscribe(cs => {
      this.constructors = cs.map(c => ({
        value: c.constructorId,
        label: c.name,
      }));
      this.constructors.unshift({ value: null, label: 'All' });
    });
    this.circuitsService.getAll().subscribe(cs => {
      this.circuits = cs.map(c => ({
        value: c.circuitId,
        label: c.circuitName,
      }));
      this.circuits.unshift({ value: null, label: 'All' });
    });
  }

  newModel() {
    this.model = new RaceResultsModel();
  }

  onSubmit() {
    console.log('Submit!');
  }

  get diagnostic() {
    return JSON.stringify(this.model);
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
    array.unshift({ value: null, label: 'All' });
  }
  return array;
}
