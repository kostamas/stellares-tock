import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PortfolioComponent} from './portfolio/portfolio.component';
import {MatButtonModule, MatSelectModule} from '@angular/material';
import {FormsModule} from '@angular/forms';
import {StockInfoComponent} from '../shared/stock-info/stock-info.component';
import {RouterModule} from '@angular/router';
import {stellareStocks} from './stellare-stocks.route';
import {GeneralVolumeComponent} from './general-volume/general-volume.component';

@NgModule({
  declarations: [
    PortfolioComponent,
    StockInfoComponent,
    GeneralVolumeComponent
  ],
  imports: [
    RouterModule.forChild(stellareStocks),
    CommonModule,
    MatSelectModule,
    FormsModule,
    MatButtonModule
  ],
  exports: [
    PortfolioComponent
  ]
})
export class StellareStocksModule {
}
