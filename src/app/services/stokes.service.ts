import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {IStocksData} from '../../types/api/stock';
import {HttpClient} from '@angular/common/http';
import {ApiService} from '../core/api';

@Injectable({
  providedIn: 'root'
})
export class StokesService {
  public stocksData$: BehaviorSubject<IStocksData> = new BehaviorSubject<IStocksData>(null);
  public stocksFunctionType = 'TIME_SERIES_INTRADAY';
  public interval = 1;
  public stocksList = [
    'AAPL', 'ARNA', 'CLDR', 'FB', 'AMZN ', 'PLAY ', 'CBS ', 'NBIX ', 'SBGI ',
    'LAUR ', 'AAP ', 'BA ', 'BABA ', 'CABO ', 'DATA ', 'MAN ', 'ZEN ', 'ZOES'
  ];

  constructor(private http: HttpClient, private api: ApiService) {
  }

  public getStocks(symbol: string, cb: any): void {
    const {stocks, API_KEY} = this.api;
    const url = `${stocks}?function=${this.stocksFunctionType}&symbol=${symbol}&interval=${this.interval}min&apikey=${API_KEY}`;
    this.http.get(url).subscribe((stocksData: IStocksData) => {
      this.stocksData$.next(stocksData);
      if (cb) {
        cb(stocksData);
      }
    });
  }
}
