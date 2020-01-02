import { Response } from "../Response";
import { VendorOrder } from "./VendorOrder";

export class VendroOrderResponse extends Response{
    listOfVendorOrders : VendorOrder[]
}