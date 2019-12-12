import { Shelf } from "./Shelf";

export class ShelfResponse extends Error{
  shelves: Shelf[];
  status: number; 
}
