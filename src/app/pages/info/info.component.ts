import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TotalGpWorld } from '../../domain/github/total-gp-world';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
})
export class InfoComponent implements OnInit {
  androidAppImages: any[] = [];

  version: String;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http
      .get<any>('./assets/version.json')
      .subscribe(data => (this.version = data['code']));

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
