import { Component, OnInit } from '@angular/core';

import { ConstructorsService } from '../../../services/constructors.service';

import { ConstructorStanding } from '../../../domain/constructor-standing';

@Component({
  selector: 'constructor-standings',
  templateUrl: './constructor-standings.component.html',
  styleUrls: ['./constructor-standings.component.scss']
})
export class ConstructorStandingsComponent implements OnInit {

  standings : ConstructorStanding[];

  constructor(private constructorsService: ConstructorsService) { }

  ngOnInit() {
    console.log('bbb');
    this.getSeasons();
  }

  public getSeasons() : void {
    //console.log(this.dataService.getSeasons());

    this.constructorsService
            .getStandings("current")
            .subscribe(
            result => {
              console.log('Risultato: ' + result.length);
              //this.standings = result;

              if(result == undefined || result.length == 0) {
                this.standings = [];
              } else {
                var tmp : ConstructorStanding[] = [];
                result.forEach( (element) => {
                  tmp.push(new ConstructorStanding(element))
                });
                this.standings = tmp;
              }
            },
            error => () => {
              console.log('Something went wrong...');
            },
            () => {
              console.log('Getting all values complete');
            });
  }

}
