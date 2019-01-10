import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TotalGpWorld } from '../../../domain/github/total-gp-world';

@Component({
  selector: 'info-android',
  templateUrl: './info-android.component.html',
  styleUrls: ['./info-android.component.scss'],
})
export class InfoAndroidComponent implements OnInit {
  androidAppImages: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http
      .get<TotalGpWorld>('./assets/github/total-gp-world/config.json')
      .subscribe(config => {
        const baseUrl = config.imagesUrl;
        this.androidAppImages = config.images.map(img => {
          return {
            source: baseUrl + img.source,
            title: img.title,
          };
        });
      });
  }
}
