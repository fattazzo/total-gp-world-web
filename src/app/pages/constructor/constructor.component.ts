import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Constructor } from '../../domain/constructor';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { ConstructorsService } from '../../services/constructors.service';
import { SeasonsService } from '../../services/seasons.service';

@Component({
  selector: 'constructor',
  templateUrl: './constructor.component.html',
  styleUrls: ['./constructor.component.scss'],
})
export class ConstructorComponent implements OnInit, OnDestroy {
  constructorSelected: string;
  season: string;

  constructors: Observable<Constructor[]> = of();

  wikiUrl: string;

  seasonSubscribe: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private constructorsService: ConstructorsService,
    private seasonsService: SeasonsService,
  ) {}

  ngOnDestroy() {
    this.seasonSubscribe.unsubscribe();
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.season = params['season'];
      this.constructorSelected = params['constructorId'];

      if (this.season !== undefined) {
        this.constructors = this.constructorsService.get(this.season);
        this.wikiUrl = undefined;

        if (this.constructorSelected !== undefined) {
          this.constructors.forEach(cs => {
            cs.forEach(c => {
              if (c.constructorId === this.constructorSelected) {
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
          this.onChange(this.constructorSelected);
        }
      });
  }

  onChange(newValue) {
    this.router.navigate([
      '/pages/sections/constructor',
      { season: this.season, constructorId: newValue },
    ]);
  }
}
