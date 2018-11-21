import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { GithubRepo } from '../model/github-repo';
import { environment } from '../../../../../environments/environment';
import { GithubProjects } from '../model/github-projects';
import { of } from 'rxjs';
import { map, share } from 'rxjs/operators';
import { Configuration } from '../../../../app.constants';

@Injectable({
  providedIn: 'root',
})
export class GithubReposService {
  data: GithubProjects;
  obsData: Observable<GithubProjects>;

  constructor(private http: HttpClient, private config: Configuration) {}

  getRepos(username: string): Observable<GithubRepo[]> {
    return this.http.get<GithubRepo[]>(
      `${environment.githubUserApiUrl}${username}/repos`,
    );
  }

  getProjects(): Observable<GithubProjects> {
    if (this.data) {
      return of(this.data);
    } else if (this.obsData) {
      return this.obsData;
    } else {
      this.obsData = this.http
        .get<GithubProjects>(
          `https://gist.githubusercontent.com/${
            this.config.githubUserName
          }/d6aa41128c39b4882c0b6bd232984cfb/raw/projetcs.json`,
          {
            observe: 'response',
          },
        )
        .pipe(
          map(response => {
            this.obsData = null;
            if (response.status === 400) {
              return undefined;
            } else if (response.status === 200) {
              this.data = response.body;
              return this.data;
            }
          }),
        );
      share();
      return this.obsData;
    }
  }
}
