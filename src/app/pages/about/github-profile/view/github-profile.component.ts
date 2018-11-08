import { Component, OnInit } from '@angular/core';
import { GithubProfileService } from '../service/github-profile.service';
import { GithubUserInfo } from '../model/github-user-info';
import { Observable } from 'rxjs';
import { GithubProjects } from '../../github-repos/model/github-projects';
import { GithubReposService } from '../../github-repos/service/github-repos.service';

@Component({
  selector: 'github-profile',
  templateUrl: './github-profile.component.html',
  styleUrls: ['./github-profile.component.scss'],
})
export class GithubProfileComponent implements OnInit {
  user: Observable<GithubUserInfo>;
  projects$: Observable<GithubProjects>;

  constructor(
    private githubProfileService: GithubProfileService,
    private githubReposService: GithubReposService,
  ) {}

  ngOnInit() {
    this.user = this.githubProfileService.getUserInfo();
    this.projects$ = this.githubReposService.getProjects();
  }
}
