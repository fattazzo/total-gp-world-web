import { Routes, RouterModule } from "@angular/router";
import { OptionsComponent } from "./options.component";
import { NgModule } from "@angular/core";

const routes: Routes = [
  {
    path: '',
    component: OptionsComponent
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OptionsRoutingModule { }
