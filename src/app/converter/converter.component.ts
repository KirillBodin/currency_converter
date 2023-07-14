import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from '../../validators/validators';

interface ExchangeRates {
  [currency: string]: number;
}

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.css']
})
export class ConverterComponent {
  @Input() exchangeRates: ExchangeRates | undefined;
  converterForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.converterForm = this.fb.group({
      inputValue: ['', [Validators.required, CustomValidators.positiveNumber]],
      inCurr: ['USD'],
      outputValue: ['', [Validators.required, CustomValidators.validNumber]],
      outCurr: ['UAH']
    });
  }

  get inputValue() {
    return this.converterForm.get('inputValue');
  }

  get outputValue() {
    return this.converterForm.get('outputValue');
  }

  calculateOutput() {
    const inCurrRate = this.exchangeRates?.[this.converterForm.value.inCurr.toLowerCase()] || 0;
    const outCurrRate = this.exchangeRates?.[this.converterForm.value.outCurr.toLowerCase()] || 0;
    const inputValue = this.converterForm.value.inputValue;

    if (this.inputValue?.invalid) {
      this.outputValue?.setValue(0);
      return;
    }

    this.calculateAndUpdateValue(inputValue, inCurrRate, 'outputValue', outCurrRate);
  }


  calculateInput() {
    const inCurrRate = this.exchangeRates?.[this.converterForm.value.inCurr.toLowerCase()] || 0;
    const outCurrRate = this.exchangeRates?.[this.converterForm.value.outCurr.toLowerCase()] || 0;
    const outputValue = this.converterForm.value.outputValue;

    if (this.outputValue?.invalid) {
      this.inputValue?.setValue(0);
      return;
    }

    this.calculateAndUpdateValue(outputValue, outCurrRate, 'inputValue', inCurrRate);
  }


  calculateAndUpdateValue(value: number, rate: number, controlName: string, inCurrRate: number) {
    const calculatedValue = this.calculateValue(value, rate) * inCurrRate;
    this.converterForm.patchValue({
      [controlName]: this.roundValue(calculatedValue)
    });
  }


  calculateValue(value: number, rate: number): number {
    return value / rate;
  }

  roundValue(value: number): number {
    return Math.round(value * 100) / 100;
  }
}
