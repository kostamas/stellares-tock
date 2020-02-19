import {Component, OnDestroy, OnInit} from '@angular/core';
import {IStockInfo} from '../../../types/api/stock';
import {StokesService} from '../../services/stokes.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {combineLatest} from 'rxjs';

@Component({
  selector: 'app-general-volume',
  templateUrl: './general-volume.component.html',
  styleUrls: ['./general-volume.component.scss'],
  animations: [
    trigger('simpleFadeAnimation', [
      state('in', style({opacity: 1})),
      transition(':enter', [
        style({opacity: 0}),
        animate(100)
      ]),
      transition(':leave',
        animate(150, style({opacity: 0})))
    ])]
})
export class GeneralVolumeComponent implements OnInit, OnDestroy {
  public generalVolume: number;
  public interval: number;
  public selectedStocks: IStockInfo[] = [];
  public subscription: any;

  constructor(private stokesService: StokesService) {
  }

  ngOnInit() {
    this.subscription = combineLatest(this.stokesService.selectedSymbols$, this.stokesService.selectedStocks$)
      .subscribe(([symbols, selectedStocks]) => {
        if (selectedStocks) {
          this.selectedStocks = selectedStocks;
          this.calcGeneralVolume(this.selectedStocks);
        }
        if (symbols) {
          this.interval = setInterval(() => {
            this.selectedStocks = [];
            this.stokesService.getStocks(symbols, (stocks: IStockInfo[]) => {
              if (stocks) {
                this.selectedStocks = stocks;
                this.calcGeneralVolume(this.selectedStocks);
                this.stokesService.selectedStocks$.next(stocks);
              }
            });
          }, 4 * 1000);
        }
      });
  }

  calcGeneralVolume(stocks: IStockInfo[]): void {
    this.generalVolume = stocks.reduce((volum: number, stock: IStockInfo) => stock.volume + volum, 0);
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
    this.subscription.unsubscribe();
  }
}
