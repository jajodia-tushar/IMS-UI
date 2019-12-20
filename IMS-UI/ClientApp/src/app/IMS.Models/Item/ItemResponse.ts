import { Item } from "./Item";



export class ItemResponse extends Error{
  items: Item [];
  status: string; 
}
