import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Attribution } from '../../../domain/attribution/attribution';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'info-thanks',
  templateUrl: './info-thanks.component.html',
  styleUrls: ['./info-thanks.component.scss'],
})
export class InfoThanksComponent implements OnInit {
  attribution$: Observable<Attribution>;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.attribution$ = this.http.get<Attribution>(
      './assets/attribution/config.json',
    );
  }
}
