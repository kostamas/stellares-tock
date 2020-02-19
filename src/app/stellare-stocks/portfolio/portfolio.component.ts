import {Component, OnDestroy, OnInit} from '@angular/core';
import {StokesService} from '../../services/stokes.service';
import {IStockInfo} from '../../../types/api/stock';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {combineLatest} from 'rxjs';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss'],
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
export class PortfolioComponent implements OnInit, OnDestroy {
  public seconds: number[] = [1, 3, 5, 10, 20, 30];
  public selectedRate: number;
  public symbolsList: string[] = [];
  public selectedStocks: IStockInfo[] = [];
  public selectedSymbols: string[] = [];
  public selectedSymbol = '';
  public interval: number;
  public subscription: any;

  constructor(private stokesService: StokesService) {
  }

  ngOnInit() {
    this.symbolsList = [...this.stokesService.symbolsList];
    this.selectedRate = this.seconds[2];
    this.subscription = combineLatest(this.stokesService.selectedSymbols$, this.stokesService.selectedStocks$)
      .pipe(take(1))
      .subscribe(([symbols, stocks]) => {
        if (symbols) {
          this.selectedSymbols = symbols;
        }
        if (stocks) {
          this.selectedStocks = stocks;
        }
        this.setInterval(this.selectedRate);
      });
  }

  setInterval(selectedRate): void {
    clearInterval(this.interval);
    this.interval = setInterval(() => {
      this.selectedStocks = [];
      this.getStockBySymbol(this.selectedSymbols);
    }, selectedRate * 1000);
  }

  getStockBySymbol(symbols: string[]) {
    this.stokesService.getStocks(symbols, (stocks: IStockInfo[]) => {
      if (stocks) {
        this.selectedStocks = stocks;
        this.stokesService.selectedStocks$.next(stocks);
      }
    });
  }

  onSelectSymbol(selectedSymbol: string): void {
    if (selectedSymbol && this.selectedSymbols.indexOf(selectedSymbol) === -1) {
      this.selectedSymbols.push(selectedSymbol);
      this.stokesService.getStocks([selectedSymbol], (stocks: IStockInfo[]) => {
        if (stocks && stocks.length) {
          this.selectedStocks.push(stocks[0]);
          this.stokesService.selectedStocks$.next(this.selectedStocks);
        }
      });
      this.stokesService.selectedSymbols$.next(this.selectedSymbols);
    }
    setTimeout(() => this.selectedSymbol = '');
  }

  onItemRemoved(stockToRemove: IStockInfo): void {
    this.selectedSymbols = this.selectedSymbols.filter(symbol => symbol !== stockToRemove.symbol);
    this.selectedStocks = this.selectedStocks.filter(stock => stock.symbol !== stockToRemove.symbol);
    this.stokesService.selectedSymbols$.next(this.selectedSymbols);
    this.stokesService.selectedStocks$.next(this.selectedStocks);

  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
    this.subscription.unsubscribe();
  }
}
