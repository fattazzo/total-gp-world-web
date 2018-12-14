import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as ergastFinishingStatusImages from '../../assets/ergast/finishing-status/config.json';

export interface ErgastFinishingStatusImages {
  status: Status[];
  default: string;
}
export interface Status {
  name: string;
  image: string;
}

@Injectable({
  providedIn: 'root',
})
export class ImagesService {
  constructor(private http: HttpClient) {}

  getFinishStatusImagePath(statusName: string): string {
    const defaultPath = (<any>ergastFinishingStatusImages).defaultstatus;
    const status = (<any>ergastFinishingStatusImages).status.find(
      s => s.name === statusName,
    );

    let path: string;
    if (status !== undefined) {
      path = `./assets/ergast/finishing-status/${status.image}`;
    } else {
      path = `./assets/ergast/finishing-status/${defaultPath}`;
    }

    return path;
  }

  getPitStopImagePath(): string {
    return this.getFinishStatusImagePath('pit');
  }

  getDefaultImagePath(): string {
    return `./assets/ergast/finishing-status/${
      (<any>ergastFinishingStatusImages).defaultstatus
    }`;
  }
}
