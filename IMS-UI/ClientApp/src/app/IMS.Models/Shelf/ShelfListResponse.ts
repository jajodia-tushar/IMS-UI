import { Shelf } from "./Shelf";
import { Response } from 'src/app/IMS.Models/Shared/Response';

export class ShelfListResponse extends Response{
  shelves: Shelf[];
}