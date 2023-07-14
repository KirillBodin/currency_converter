import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface ExchangeRates {
  [currency: string]: number;
}

@Injectable({
  providedIn: 'root'
})
export class ExchangeRatesService {
  exchangeRates: ExchangeRates = {};
  errorFetchingRates: boolean = false;

  constructor(private http: HttpClient) {}

  fetchExchangeRates(): Observable<any> {
    return this.http.get<any>(
      'https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/uah.json'
    ).pipe(
      map((response: any) => response),
      catchError((error: any) => {
        console.error('Failed to fetch exchange rates:', error);
        this.errorFetchingRates = true;
        return throwError('Failed to fetch exchange rates');
      })
    );
  }
}
