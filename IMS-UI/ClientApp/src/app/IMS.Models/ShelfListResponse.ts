import { Shelf } from "./Shelf";

export class ShelfListResponse extends Error{
  shelves: Shelf[];
  status: number; 
}
