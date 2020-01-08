import { OrderItemDetail } from "./OrderItemDetail";

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
  orderItemDetails: OrderItemDetail[];
  finalAmount: number;
}
