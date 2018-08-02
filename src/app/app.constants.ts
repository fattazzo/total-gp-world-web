import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
  })
export class Configuration {
    public Server = 'https://ergast.com/';
    public ApiUrl = 'api/f1/';
    public ServerWithApiUrl = this.Server + this.ApiUrl;
}
