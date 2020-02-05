import { CartItem } from "../CartItem";
import { PagingInfo } from "../Shared/PagingInfo";
import { Response } from "../Response";

export class ItemsAvailabilityResponse extends Response {
    itemQuantityMappings: CartItem[];
    pagingInfo: PagingInfo;
}