import { ItemQuantityMapping } from "../Item/ItemQuantityMapping";
import { Shelf } from "./Shelf";
import { CartItem } from "../CartItem";

export class ShelfData {
    shelf: Shelf;
    itemQuantityMappings :CartItem [];
    status : string;
    error : string;
  }