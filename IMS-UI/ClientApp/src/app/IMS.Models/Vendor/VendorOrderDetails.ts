import { OrderItemDetail } from "./OrderItemDetail";
import { ItemQuantityPriceMapping } from "../Item/ItemQuantityPriceMapping";

export class VendorOrderDetails {
  orderId: number;
  isApproved: boolean;
  recievedBy: string;
  submittedTo: string;
  taxableAmount: number;
  invoiceNumber: string;
  invoiceImageUrl: string;
  challanNumber: string;
  challanImageUrl: string;
  date: Date;
  orderItemDetails: ItemQuantityPriceMapping[];
  finalAmount: number;
}
