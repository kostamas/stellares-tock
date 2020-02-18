import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PortfolioComponent} from './portfolio.component';
import {MatButtonModule, MatSelectModule} from '@angular/material';
import {FormsModule} from '@angular/forms';
import {StockInfoComponent} from '../shared/stock-info/stock-info.component';

@NgModule({
  declarations: [
    PortfolioComponent,
    StockInfoComponent
  ],
    imports: [
        CommonModule,
        MatSelectModule,
        FormsModule,
        MatButtonModule
    ],
  exports: [
    PortfolioComponent
  ]
})
export class PortfolioModule {
}
