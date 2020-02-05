import { CartItem } from "../CartItem";
import { Error } from "../Error";

export class FrequentlyUsedItemModel {
  itemQuantityMapping: CartItem[];
  error: Error;
  status: string;
}
