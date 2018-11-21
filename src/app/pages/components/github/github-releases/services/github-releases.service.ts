import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GitHubRelease } from '../model/github-release';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class GithubReleasesService {
  private releases: GitHubRelease[];

  constructor(private http: HttpClient) {}

  public getReleases(): Observable<GitHubRelease[]> {
    if (this.releases && this.releases.length > 0) {
      return of(this.releases);
    }

    return this.loadReleases();
  }

  private loadReleases(): Observable<GitHubRelease[]> {
    return this.http
      .get<GitHubRelease[]>(
        'https://api.github.com/repos/fattazzo/total-gp-world-web/releases',
      )
      .pipe(
        map(result => {
          this.releases = result;
          return result;
        }),
      );
  }
}
