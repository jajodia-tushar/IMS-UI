import { Item } from "./Item";

export class ItemsResponse {
    items : Item[];
    success : string;
    error : Error;
}