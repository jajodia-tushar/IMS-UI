import { Response } from "../Response";
import { VendorOrder } from "./VendorOrder";
import { PagingInfo } from "../Shared/PagingInfo";

export class VendorOrderResponse extends Response{
    vendorOrders: VendorOrder[];
    pagingInfo: PagingInfo;
}