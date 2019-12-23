import { Item } from "../Item/Item";
import { ItemQuantityMapping } from "../Item/ItemQuantityMapping";
import { CartItem } from "../CartItem";

export class FrequentlyUsedItemModel {
  
  itemQuantityMapping : CartItem[];
  error : Error;
  status : string;
}
