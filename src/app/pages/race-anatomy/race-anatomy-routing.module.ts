import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { RaceAnatomyComponent } from './race-anatomy.component';

const routes: Routes = [
  {
    path: '',
    component: RaceAnatomyComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RaceAnatomyRoutingModule {}
