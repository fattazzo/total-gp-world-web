import { NgModule } from '@angular/core';
import { ThemeModule } from '../../../@theme/theme.module';
import { WikipediaPageComponent } from './wikipedia-page.component';

import { CapitalizePipe } from '../../../@theme/pipes'
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
    imports: [
        ThemeModule,
        TranslateModule
    ],
    declarations: [
        WikipediaPageComponent
    ],
    providers: [
        CapitalizePipe
    ],
    exports: [
        WikipediaPageComponent
    ],
})
export class WikipediaPageModule { }