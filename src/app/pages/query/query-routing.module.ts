import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { QueryComponent } from './query.component';

const routes: Routes = [
  {
    path: '',
    component: QueryComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QueryRoutingModule {}
