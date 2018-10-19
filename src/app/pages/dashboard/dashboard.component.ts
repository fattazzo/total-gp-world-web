import { Component, OnInit } from '@angular/core';
import { SeasonsService } from '../../services/seasons.service';

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  season: string;

  constructor(private seansonService: SeasonsService) {}

  ngOnInit() {
    this.seansonService.getSeason().subscribe(s => (this.season = s));
  }
}
