import {IStockInfo} from './types/api/stock';
import {Observable, Subject} from 'rxjs';


export const getStocks = (symbols: string[]): Observable<IStockInfo[]> => {
  const stocks = [];
  const res: Subject<IStockInfo[]> = new Subject();
  symbols.forEach(symbol => stocks.push({
    symbol,
    price: Math.floor((Math.random() * 80) + 50),
    volume: Math.floor((Math.random() * 100000) + 1000),
    date: Date.now() - (Math.floor((Math.random() * 50000)) + 1000)
  }));
  setTimeout(() => res.next(stocks), 300);
  return res;
};


