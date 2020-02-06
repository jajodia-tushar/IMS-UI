import { Pipe, PipeTransform } from '@angular/core';
import { Item } from 'src/app/IMS.Models/Item/Item';
@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: Item[], searchText: string): Item[] {
    if(!items) return [];
    if(!searchText) return items;
    searchText = searchText.toLowerCase();
    
    return items.filter( item => {
      return item.name.toLowerCase().includes(searchText);
    })
   }
}