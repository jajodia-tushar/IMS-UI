import { VendorOrder } from "./VendorOrder";
import { Response } from "../Response";

export class SingleVendorOrderResponse extends Response {
    vendorOrder: VendorOrder;
    canEdit: boolean;
    lastModifiedBy: string;
}