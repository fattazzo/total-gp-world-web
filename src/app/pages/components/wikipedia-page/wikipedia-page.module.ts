import { NgModule } from '@angular/core';
import { ThemeModule } from '../../../@theme/theme.module';
import { WikipediaPageComponent } from './wikipedia-page.component';


@NgModule({
    imports: [
        ThemeModule
    ],
    declarations: [
        WikipediaPageComponent
    ],
    exports: [
        WikipediaPageComponent
    ],
})
export class WikipediaPageModule { }