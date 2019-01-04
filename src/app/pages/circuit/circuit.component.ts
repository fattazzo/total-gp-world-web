import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SeasonsService } from '../../services/seasons.service';
import { CircuitsService } from '../../services/circuits.service';
import { Observable, of } from 'rxjs';
import { Circuit } from '../../domain/circuit';
import { AppSettingsService } from '../../services/app-settings.service';

@Component({
  selector: 'circuit',
  templateUrl: './circuit.component.html',
  styleUrls: ['./circuit.component.scss'],
})
export class CircuitComponent implements OnInit, OnDestroy {
  circuitSelected: string;
  season: string;

  circuits: Observable<Circuit[]> = of();

  wikiUrl: string;

  seasonSubscribe: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private circuitsService: CircuitsService,
    private seasonsService: SeasonsService,
    public appSettings: AppSettingsService,
  ) {}

  ngOnDestroy() {
    this.seasonSubscribe.unsubscribe();
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.season = params['season'];
      this.circuitSelected = params['circuitId'];

      if (this.season !== undefined) {
        this.circuits = this.circuitsService.get(this.season);
        this.wikiUrl = undefined;

        if (this.circuitSelected !== undefined) {
          this.circuits.forEach(cs => {
            cs.forEach(c => {
              if (c.circuitId === this.circuitSelected) {
                this.wikiUrl = c.url;
              }
            });
          });
        }
      }
    });

    this.seasonSubscribe = this.seasonsService
      .getSeason()
      .subscribe(newSeason => {
        if (this.season !== newSeason) {
          this.season = newSeason;
          this.onChange(this.circuitSelected);
        }
      });
  }

  onChange(newValue) {
    this.router.navigate([
      '/pages/sections/circuit',
      { season: this.season, circuitId: newValue },
    ]);
  }
}
