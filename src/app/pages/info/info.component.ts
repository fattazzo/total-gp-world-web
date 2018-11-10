import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
})
export class InfoComponent implements OnInit {
  androidAppImages: any[];

  constructor() {}

  ngOnInit() {
    const baseUrl =
      'https://raw.githubusercontent.com/wiki/fattazzo/total-gp-world/images/';

    this.androidAppImages = [];
    this.androidAppImages.push({
      source: `${baseUrl}sez_princ2.png`,
      title: 'Main window',
    });
    this.androidAppImages.push({
      source: `${baseUrl}drivers.png`,
      title: 'Drivers',
    });
    this.androidAppImages.push({
      source: `${baseUrl}driver_progress.png`,
      title: 'Driver progress',
    });
    this.androidAppImages.push({
      source: `${baseUrl}driver_ranking.png`,
      title: 'Driver ranking charts',
    });
    this.androidAppImages.push({
      source: `${baseUrl}driver_info.png`,
      title: 'Driver info',
    });
    this.androidAppImages.push({
      source: `${baseUrl}constructors.png`,
      title: 'Constructors',
    });
    this.androidAppImages.push({
      source: `${baseUrl}constructor_progress.png`,
      title: 'Constructor progress',
    });
    this.androidAppImages.push({
      source: `${baseUrl}constructor_info.png`,
      title: 'Constructor info',
    });
    this.androidAppImages.push({
      source: `${baseUrl}races.png`,
      title: 'Races',
    });
    this.androidAppImages.push({
      source: `${baseUrl}race_results.png`,
      title: 'Race results',
    });
    this.androidAppImages.push({
      source: `${baseUrl}race_stat_pittops.png`,
      title: 'Race pit stat',
    });
    this.androidAppImages.push({
      source: `${baseUrl}race_stat_positions.png`,
      title: 'Race positions stat',
    });
    this.androidAppImages.push({
      source: `${baseUrl}race_qualifications.png`,
      title: 'Race qualifications',
    });
    this.androidAppImages.push({
      source: `${baseUrl}race_info.png`,
      title: 'Race info',
    });
    this.androidAppImages.push({
      source: `${baseUrl}news.png`,
      title: 'News',
    });
    this.androidAppImages.push({
      source: `${baseUrl}stats_drivers_wins.png`,
      title: 'Drivers stats',
    });
    this.androidAppImages.push({
      source: `${baseUrl}stats_constructors_wins.png`,
      title: 'Constructors stats',
    });
    this.androidAppImages.push({
      source: `${baseUrl}stats_season_comparison.png`,
      title: 'Season stats',
    });
  }
}
