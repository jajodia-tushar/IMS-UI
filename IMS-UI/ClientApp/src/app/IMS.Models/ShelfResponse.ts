import { Shelf } from "./Shelf";

export class ShelfResponse {
    shelf : Shelf;
    status : string;
    error : Error;
}