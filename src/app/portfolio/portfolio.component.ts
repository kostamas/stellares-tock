import {Component, OnInit} from '@angular/core';
import {StokesService} from '../services/stokes.service';
import {IStock, IStockInfo, IStocksData} from '../../types/api/stock';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {
  public seconds: number[] = [1, 5, 15, 30];
  public selectedRate: number;
  public stocksList: string[] = [];
  public selectedStocks: IStockInfo[];
  public selectedSymbols: string[] = [];
  public selectedSymbols$: Subject<string[]> = new Subject<string[]>();
  public subscriptions: any[] = [];
  public interval: number;

  constructor(private stokesService: StokesService) {
  }

  ngOnInit() {
    this.selectedRate = this.seconds[0];
    this.stocksList = [...this.stokesService.stocksList];
    const subscriptions = this.selectedSymbols$.subscribe((symbols: string[]) => {
      clearInterval(this.interval);
      this.interval = setInterval(() => {
        symbols.forEach(symbol => {
          this.stokesService.getStocks(symbol, (stockData: IStocksData) => {
            if (stockData) {
              const stocksPerSymbol = Object.values(stockData[`Time Series (${this.selectedRate}min)`]);
              // this.selectedStocks.push(stocksPerSymbol);
              debugger

            }
          });
        }, 6 * 1000);
      });
    });

    this.subscriptions.push(subscriptions);
  }

  onSelectSymbol(selectedSymbol: string): void {
    if (selectedSymbol && this.selectedSymbols.indexOf(selectedSymbol) === -1) {
      this.selectedSymbols.push(selectedSymbol);
      this.selectedSymbols$.next(this.selectedSymbols);
    }
  }

  onItemRemoved(stockToRemove: IStockInfo): void {
    debugger
  }
}
