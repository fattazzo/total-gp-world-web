import { Component, OnInit } from '@angular/core';

import { SeasonsResponse } from '../../domain/seasons-response';

@Component({
  selector: 'drivers',
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.scss']
})
export class DriversComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.getSeasons();
  }

  public getSeasons() : void {
  }

}
