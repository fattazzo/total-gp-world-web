import { Component, OnInit, OnDestroy } from '@angular/core';
import { SeasonsService } from '../../services/seasons.service';

@Component({
  selector: 'comparison',
  templateUrl: './comparison.component.html',
  styleUrls: ['./comparison.component.scss'],
})
export class ComparisonComponent implements OnInit, OnDestroy {
  selectedType = '';

  season: string;

  seasonSubscribe: any;

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

  onTypeChange() {}
}
