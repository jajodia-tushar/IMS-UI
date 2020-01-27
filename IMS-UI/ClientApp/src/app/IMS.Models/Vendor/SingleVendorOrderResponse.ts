import { VendorOrder } from "./VendorOrder";

export class SingleVendorOrderResponse extends Response {
    vendorOrder: VendorOrder;
    canEdit: boolean;
}