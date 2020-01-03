import { ItemQuantityMapping } from "../Item/ItemQuantityMapping";
import { CartItem } from "../CartItem";
import { Error } from "../Error";

export class ItemsAvailabilityResponse{
    itemQuantityMappings: CartItem[];
    status: string;
    error: Error;
}