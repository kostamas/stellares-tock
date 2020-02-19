import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public API_KEY = 'MJJOQ69Y676IMJWR';
  public stocks = 'https://www.alphavantage.co/query';
}
