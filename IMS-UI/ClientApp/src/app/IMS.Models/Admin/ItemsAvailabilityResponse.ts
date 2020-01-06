import { ItemQuantityMapping } from "../Item/ItemQuantityMapping";
import { CartItem } from "../CartItem";
import { Error } from "../Error";
import { PagingInfo } from "../Shared/PagingInfo";

export class ItemsAvailabilityResponse{
    itemQuantityMappings: CartItem[];
    pagingInfo: PagingInfo;
    status: string;
    error: Error;
}