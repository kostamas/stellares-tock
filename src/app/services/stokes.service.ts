import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {IStockInfo, IStocksData} from '../../types/api/stock';
import {HttpClient} from '@angular/common/http';
import {ApiService} from '../core/api';
import {getStocks} from '../../mockDB';

@Injectable({
  providedIn: 'root'
})
export class StokesService {
  public stocksData$: BehaviorSubject<IStocksData> = new BehaviorSubject<IStocksData>(null);
  public selectedSymbols$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>(null);
  public selectedStocks$: BehaviorSubject<IStockInfo[]> = new BehaviorSubject<IStockInfo[]>(null);

  public stocksFunctionType = 'TIME_SERIES_INTRADAY';
  public interval = 1;
  public symbolsList = [
    'AAPL', 'ARNA', 'CLDR', 'FB', 'AMZN', 'PLAY', 'CBS', 'NBIX', 'SBGI',
    'LAUR', 'AAP', 'BA', 'BABA', 'CABO', 'DATA', 'MAN', 'ZEN', 'ZOES'
  ];

  constructor(private http: HttpClient, private api: ApiService) {
  }

  public getStocks(symbols: string[], cb: any): void {
    // const {stocks, API_KEY} = this.api;
    // const url = `${stocks}?function=${this.stocksFunctionType}&symbol=${symbol}&interval=${this.interval}min&apikey=${API_KEY}`;
    // this.http.get(url).subscribe((stocksData: IStocksData) => {
    //   this.stocksData$.next(stocksData);
    //   if (cb) {
    //     cb(stocksData);
    //   }
    // });

    getStocks(symbols).subscribe((stocks: IStockInfo[]) => {
      if (cb) {
        cb(stocks);
      }
    });
  }
}
