import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'details'
})
export class DetailsPipe implements PipeTransform {

  transform(value: string): string {
    if (value.length <= 30)
      return value;
    else
      return value.substr(0, 27) + '...';
  }

}
