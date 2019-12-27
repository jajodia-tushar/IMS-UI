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
        return (item.name.toLowerCase().startsWith(searchText) || this.isNameInSecondHalf(searchText, item.name.toLowerCase()));
    })
   }

   isNameInSecondHalf(searchText : string, item : string) : boolean{
    // if(item == "")   
    // console.log("This is the text ---- > "+ searchText+"  ---"+ item);
    return item.split(" ").filter( part => part.startsWith(searchText)).length > 0;
   }
}