export class Shelf {
  id: number;
  name: string;
  code: string;
  isActive: boolean;
}
export class ShelfResponse extends Error{
  shelves: Shelf[];
  status: number; 
}
