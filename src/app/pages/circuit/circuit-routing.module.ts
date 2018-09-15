import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { CircuitComponent } from "./circuit.component";

const routes: Routes = [
    {
        path: '',
        component: CircuitComponent
    },
    {
        path: 'sections/circuit/:season/:circuitId',
        component: CircuitComponent
    }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CircuitRoutingModule { }
