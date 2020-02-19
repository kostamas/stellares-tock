import {Routes} from '@angular/router';
import {PortfolioComponent} from './portfolio/portfolio.component';
import {GeneralVolumeComponent} from './general-volume/general-volume.component';

export const stellareStocks: Routes = [
  {path: 'portfolio', component: PortfolioComponent},
  {path: 'general-volume', component: GeneralVolumeComponent},
];
