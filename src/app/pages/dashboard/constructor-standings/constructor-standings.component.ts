import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ConstructorsService } from '../../../services/constructors.service';
import { SeasonsService } from '../../../services/seasons.service';

import { ConstructorStanding } from '../../../domain/constructor-standing';

import { Configuration } from '../../../app.constants';

@Component({
  selector: 'constructor-standings',
  templateUrl: './constructor-standings.component.html',
  styleUrls: ['./constructor-standings.component.scss']
})
export class ConstructorStandingsComponent implements OnInit {

  standings: Observable<ConstructorStanding[]>;

  constructor(private constructorsService: ConstructorsService, private seasonsService: SeasonsService, private config: Configuration) { }

  ngOnInit() {
    this.seasonsService.getSeason().subscribe((newSeason) => {
      this.standings = this.constructorsService.getStandings(newSeason)
    });
  }

}
