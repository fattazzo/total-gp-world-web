import { Component, OnInit } from '@angular/core';

import { DataService } from '../../services/data.service';
import { SeasonsResponse } from '../../domain/seasons-response';

@Component({
  selector: 'drivers',
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.scss']
})
export class DriversComponent implements OnInit {

  constructor(private dataService: DataService) { }

  ngOnInit() {
    console.log('bbb');
    this.getSeasons();
  }

  public getSeasons() : void {
    //console.log(this.dataService.getSeasons());

    this.dataService
            .getSeasons()
            .subscribe((data: SeasonsResponse) => console.log('Risultato: ' + new SeasonsResponse(data).toString()),
            error => () => {
              console.log('Something went wrong...');
            },
            () => {
              console.log('Getting all values complete');
            });
  }

}
