import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: './dashboard/dashboard.module#DashboardModule',
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'comparison',
        loadChildren: './comparison/comparison.module#ComparisonModule',
      },
      {
        path: 'race-anatomy',
        loadChildren: './race-anatomy/race-anatomy.module#RaceAnatomyModule',
      },
      {
        path: 'query',
        loadChildren: './query/query.module#QueryModule',
      },
      {
        path: 'sections/driver',
        loadChildren: './driver/driver.module#DriverModule',
      },
      {
        path: 'sections/constructor',
        loadChildren: './constructor/constructor.module#ConstructorModule',
      },
      {
        path: 'sections/circuit',
        loadChildren: './circuit/circuit.module#CircuitModule',
      },
      {
        path: 'options',
        loadChildren: './options/options.module#OptionsModule',
      },
      {
        path: 'about',
        loadChildren: './about/about.module#AboutModule',
      },
      {
        path: 'info',
        loadChildren: './info/info.module#InfoModule',
      },
      {
        path: 'policy',
        loadChildren: './policy/policy.module#PolicyModule',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
