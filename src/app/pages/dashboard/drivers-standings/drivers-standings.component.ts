import { Component, OnInit } from '@angular/core';

import { DriversService } from '../../../services/drivers.service';

import { DriverStanding } from '../../../domain/driver-standing';
import { Driver } from "../../../domain/driver";
import { Constructor } from "../../../domain/constructor";

@Component({
  selector: 'drivers-standings',
  templateUrl: './drivers-standings.component.html',
  styleUrls: ['./drivers-standings.component.scss']
})
export class DriversStandingsComponent implements OnInit {

  standings : DriverStanding[];

  constructor(private driversService: DriversService) { }

  ngOnInit() {
    console.log('bbb');
    this.getSeasons();
  }

  public getSeasons() : void {
    //console.log(this.dataService.getSeasons());

    this.driversService
            .getStandings("current")
            .subscribe(
            result => {
              console.log('Risultato: ' + result.length);
              //this.standings = result;

              if(result == undefined || result.length == 0) {
                this.standings = [];
              } else {
                var tmp : DriverStanding[] = [];
                result.forEach( (element) => {
                  tmp.push(new DriverStanding(element))
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
