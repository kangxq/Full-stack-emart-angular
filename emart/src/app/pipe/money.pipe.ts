import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'money'
})
export class MoneyPipe implements PipeTransform {

  transform(value: number, floats?: number): string {
    return value.toFixed(isNaN(floats) ? 2 : floats);
  }

}
