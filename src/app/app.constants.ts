import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Configuration implements OnInit {
  public Server = 'https://ergast.com/';
  public ApiUrl = 'api/f1/';
  public ServerWithApiUrl = this.Server + this.ApiUrl;

  public season: string;

  ngOnInit() {}
}
