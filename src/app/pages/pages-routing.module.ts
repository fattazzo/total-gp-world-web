import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DriverComponent } from './sections/driver/driver.component';
import { ConstructorComponent } from './sections/constructor/constructor.component';

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
      path: 'sections/driver',
      component: DriverComponent,
    },
    {
      path: 'sections/driver/:driverId',
      component: DriverComponent,
    },
    {
      path: 'sections/constructor',
      component: ConstructorComponent,
    },
    {
      path: 'sections/constructor/:constructorId',
      component: ConstructorComponent,
    }
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
