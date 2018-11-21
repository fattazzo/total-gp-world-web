import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GithubUserInfo } from '../model/github-user-info';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../../../environments/environment';
import { share, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { Configuration } from '../../../../app.constants';

@Injectable({
  providedIn: 'root',
})
export class GithubProfileService {
  profile: GithubUserInfo;
  obsProfile: Observable<GithubUserInfo>;

  constructor(private http: HttpClient, private config: Configuration) {}

  getUserInfo(): Observable<GithubUserInfo> {
    if (this.profile) {
      return of(this.profile);
    } else if (this.obsProfile) {
      return this.obsProfile;
    } else {
      this.obsProfile = this.http
        .get<GithubUserInfo>(
          `${environment.githubUserApiUrl}${this.config.githubUserName}`,
          {
            observe: 'response',
          },
        )
        .pipe(
          map(response => {
            this.obsProfile = null;
            if (response.status === 400) {
              return undefined;
            } else if (response.status === 200) {
              this.profile = response.body;
              return this.profile;
            }
          }),
        );
      share();
      return this.obsProfile;
    }
  }
}
