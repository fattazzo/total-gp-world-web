import { Component, OnInit, Input } from '@angular/core';
import { ConstructorStanding } from '../../../../domain/constructor-standing';

@Component({
  selector: 'constructors-st-table',
  templateUrl: './constructors-st-table.component.html',
  styleUrls: ['./constructors-st-table.component.scss']
})
export class ConstructorsStTableComponent implements OnInit {

  @Input() standings: ConstructorStanding[];
  @Input() season: string;

  constructor() { }

  ngOnInit() {

  }

}
