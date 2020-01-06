import { ItemQuantityMapping } from "../Item/ItemQuantityMapping";
import { CartItem } from "../CartItem";
import { Error } from "../Error";
import { PagingInfo } from "../Shared/PagingInfo";
import { Response } from "../Response";

export class ItemsAvailabilityResponse extends Response {
    itemQuantityMappings: CartItem[];
    pagingInfo: PagingInfo;
}