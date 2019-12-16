import { ItemQuantityMapping } from "../Item/ItemQuantityMapping";
import { Shelf } from "./Shelf";

export class ShelfData {
    shelf: Shelf;
    itemQuantityMappings :ItemQuantityMapping [];
    status : string;
    error : string;
  }