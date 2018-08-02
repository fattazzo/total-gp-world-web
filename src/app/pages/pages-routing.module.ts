import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DriversComponent } from './drivers/drivers.component';
import { ConstructorsComponent } from './constructors/constructors.component';
import { CircuitsComponent } from './circuits/circuits.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'dashboard',
      component: DashboardComponent,
    },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
    {
      path: 'drivers',
      component : DriversComponent,
    },
    {
      path: 'constructors',
      component : ConstructorsComponent,
    },
    {
      path: 'circuits',
      component : CircuitsComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
