import { AbstractControl, ValidationErrors, Validators } from '@angular/forms';

export class CustomValidators {
  static positiveNumber(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (value === null || value === undefined || value === '') {
      return null;
    }
    const numberValue = parseFloat(value);
    if (isNaN(numberValue) || !isFinite(numberValue) || numberValue < 0) {
      return { positiveNumber: true };
    }
    return null;
  }

  static validNumber(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (value === null || value === undefined || value === '') {
      return null;
    }
    const pattern = /^[0-9]+$/;
    if (!pattern.test(value)) {
      return { validNumber: true };
    }
    return null;
  }
}
