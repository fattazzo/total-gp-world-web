import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ComparisonComponent } from './comparison.component';

const routes: Routes = [
  {
    path: '',
    component: ComparisonComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComparisonRoutingModule {}
