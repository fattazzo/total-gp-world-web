import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeModule } from '../../../@theme/theme.module';
import { TableModule } from 'primeng/table';
import { TranslateModule } from '@ngx-translate/core';
import { ApplicationPipesModule } from '../../../pipes/application-pipes.module';
import { SeasonsComponent } from './seasons.component';
import { OrderListModule } from 'primeng/orderlist';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
    TableModule,
    TranslateModule,
    ApplicationPipesModule,
    OrderListModule,
    RouterModule,
    FontAwesomeModule,
  ],
  exports: [SeasonsComponent],
  declarations: [SeasonsComponent],
})
export class SeasonsModule {}
