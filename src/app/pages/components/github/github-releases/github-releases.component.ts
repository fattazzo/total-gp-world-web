import { Component, OnInit } from '@angular/core';
import { GithubReleasesService } from './services/github-releases.service';
import { Observable } from 'rxjs';
import { GitHubRelease } from './model/github-release';

@Component({
  selector: 'github-releases',
  templateUrl: './github-releases.component.html',
  styleUrls: ['./github-releases.component.scss'],
})
export class GithubReleasesComponent implements OnInit {
  releases$: Observable<GitHubRelease[]>;

  constructor(private githubReleaseService: GithubReleasesService) {}

  ngOnInit() {
    this.releases$ = this.githubReleaseService.getReleases();
  }
}
