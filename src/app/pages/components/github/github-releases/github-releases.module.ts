import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GithubReleasesComponent } from './github-releases.component';
import { NbListModule } from '@nebular/theme';

@NgModule({
  declarations: [GithubReleasesComponent],
  imports: [CommonModule, NbListModule],
  exports: [GithubReleasesComponent],
})
export class GithubReleasesModule {}
