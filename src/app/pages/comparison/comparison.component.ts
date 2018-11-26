import { Component, OnInit, OnDestroy } from '@angular/core';
import { SeasonsService } from '../../services/seasons.service';
import { Driver } from '../../domain/driver';
import { Constructor } from '../../domain/constructor';

@Component({
  selector: 'comparison',
  templateUrl: './comparison.component.html',
  styleUrls: ['./comparison.component.scss'],
})
export class ComparisonComponent implements OnInit, OnDestroy {
  selectedType = '';

  season: string;

  seasonSubscribe: any;

  drivers: Driver[] = [];
  constructors: Constructor[] = [];

  constructor(private seasonsService: SeasonsService) {}

  ngOnDestroy() {
    this.seasonSubscribe.unsubscribe();
  }

  ngOnInit() {
    this.seasonSubscribe = this.seasonsService
      .getSeason()
      .subscribe(newSeason => {
        if (this.season !== newSeason) {
          this.season = newSeason;
        }
      });
  }

  onSelectedTypeChange(event: string) {
    this.drivers = [];
    this.constructors = undefined;
    this.selectedType = event;
  }

  onSelectedDriversChange(value: Driver[]) {
    this.drivers = value ? value : [];
    this.constructors = undefined;
  }

  onSelectedConstructorsChange(value: Constructor[]) {
    this.constructors = value ? value : [];
    this.drivers = undefined;
  }
}
