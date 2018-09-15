import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { ConstructorComponent } from "./constructor.component";

const routes: Routes = [
    {
        path: '',
        component: ConstructorComponent
    },
    {
        path: 'sections/constructor/:season/:constructorId',
        component: ConstructorComponent
    }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ConstructorRoutingModule { }
