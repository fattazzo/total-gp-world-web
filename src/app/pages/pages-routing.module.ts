import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConstructorComponent } from './sections/constructor/constructor.component';
import { CircuitComponent } from './sections/circuit/circuit.component';
import { DriverComponent } from './sections/driver/driver.component';

const routes: Routes = [
  //{ path: 'sections/driver', loadChildren: 'app/pages/sections/driver/driver.module#DriverModule' },
  {
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
        path: 'sections/driver',
        component: DriverComponent,
      },
      {
        path: 'sections/driver/:season/:driverId',
        component: DriverComponent,
      },
      {
        path: 'sections/constructor',
        component: ConstructorComponent,
      },
      {
        path: 'sections/constructor/:season/:constructorId',
        component: ConstructorComponent,
      },
      {
        path: 'sections/circuit',
        component: CircuitComponent,
      },
      {
        path: 'sections/circuit/:season/:circuitId',
        component: CircuitComponent,
      }
    ],
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
