import { Response } from 'src/app/IMS.Models/Shared/Response';
import { Item } from "./Item";

export class ItemsResponse extends Response{
    items : Item[];
}