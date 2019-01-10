import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'info-releases',
  templateUrl: './info-releases.component.html',
  styleUrls: ['./info-releases.component.scss'],
})
export class InfoReleasesComponent implements OnInit {
  version: String;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http
      .get<any>('./assets/version.json')
      .subscribe(data => (this.version = data['code']));
  }
}
