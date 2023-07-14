import { Component, OnInit } from '@angular/core';
import { ExchangeRatesService, ExchangeRates } from '../../services/exchange-rates.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  exchangeRates: ExchangeRates = {};
  errorFetchingRates: boolean = false;

  constructor(private exchangeRatesService: ExchangeRatesService) {}

  ngOnInit() {
    this.fetchExchangeRates();
  }

  fetchExchangeRates() {
    this.exchangeRatesService.fetchExchangeRates().subscribe(
      (data: any) => {
        this.exchangeRates = data.uah;
      },
      (error: any) => {
        console.error('Failed to fetch exchange rates:', error);
        this.errorFetchingRates = true;
      }
    );
  }

  roundValue(value: number): number {
    return Math.round(value * 100) / 100;
  }
}
